import { useState } from 'react'
import { supabase } from '../utils/supabase'

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Kirjaudu sisään
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Tarkista onko käyttäjä users-taulussa
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', data.user.id)
          .single();

        if (!userData) {
          // Luo käyttäjä users-taulun jos ei ole olemassa
          await supabase
            .from('users')
            .insert({
              auth_user_id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || '',
              subscription_status: 'free',
              onboarding_completed: false,
            });
        }
      } else {
        // Rekisteröidy
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          // Luo käyttäjä users-taulun
          await supabase
            .from('users')
            .insert({
              auth_user_id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              subscription_status: 'free',
              onboarding_completed: false,
            });
        }
      }

      onAuthSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <div className="auth-logo">
          <span className="logo-text">STORIZED</span>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isLogin ? 'Kirjaudu sisään' : 'Rekisteröidy'}</h2>
          
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                placeholder="Koko nimi"
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Sähköposti"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Salasana"
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Käsitellään...' : (isLogin ? 'Kirjaudu sisään' : 'Rekisteröidy')}
          </button>

          <p className="auth-switch">
            {isLogin ? 'Eikö sinulla ole tiliä?' : 'Onko sinulla jo tili?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="switch-button"
            >
              {isLogin ? 'Rekisteröidy' : 'Kirjaudu sisään'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}