import { useState } from 'react';
import { login, setToken } from '../services/auth';
import jwt from 'jsonwebtoken';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  interface DecodedToken {
    username: string;
    roles: string[];
    // Agrega cualquier otro campo que desees extraer del token
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = await login(username, password);
      setToken(token);
      window.location.href = '/'; // Redirecciona al dashboard al iniciar sesión
    } catch (error) {
      if (error instanceof Error) {  
        const jsonObject = JSON.parse(error.message);
        const errorValue = Object.values(jsonObject)[0];         
        setErrorMessage(errorValue as string);
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {errorMessage && <p>{errorMessage}</p>}  
      <div><a href={`/register`}>Registro Usuario</a></div>   
    </form>
  );
}
