import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import './App.css'

// Määritellään Todo-tyyppi
interface Todo {
  id: number;
  text: string;
  completed?: boolean;
  created_at?: string;
}

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTodos = async (): Promise<void> => {
      try {
        const { data: todos, error } = await supabase
          .from('todos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching todos:', error);
          return;
        }

        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.completed && <span> ✓</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
