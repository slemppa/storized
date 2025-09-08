import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import AuthForm from './components/AuthForm'
import Dashboard from './components/Dashboard'
import './App.css'

// Määritellään User-tyyppi olemassa olevan taulun mukaan
interface User {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  subscription_status: 'free' | 'pro' | 'enterprise';
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

function App(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async (): Promise<void> => {
      try {
        // Hae käyttäjätiedot
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('auth_user_id', authUser.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Ladataan...</p>
      </div>
    );
  }


  if (!user) {
    return <AuthForm onAuthSuccess={() => window.location.reload()} />;
  }

  return <Dashboard user={user} />;
}

export default App
