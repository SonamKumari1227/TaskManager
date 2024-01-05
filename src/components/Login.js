import React, { useState ,useEffect} from 'react'
import TodoApp from './TodoApp'
import axios from 'axios';



function Login() {
    let name = "";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
  

  
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:8000/login', {
            email: email,
            password: password,
          });
      
          const { token, loggedIn, name, expiresIn, error } = response.data;
      
          // Set the login status and save the token to localStorage
          if (loggedIn) {
            setLoggedIn(true);
            localStorage.setItem('token', token);
      
            // Store the expiration time in localStorage
            const expirationTime = new Date().getTime() + expiresIn * 1000; // Convert to milliseconds
            localStorage.setItem('expiration', expirationTime);
          } else {
            setError(error || 'Unknown error occurred');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError('Unknown error occurred');
        }
      };
      
    console.log(name)
    // Check if the user is already authenticated based on the presence of the token in localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const expirationTime = localStorage.getItem('expiration');
      
        if (storedToken && expirationTime) {
          const currentTime = new Date().getTime();
          const isTokenValid = currentTime < parseInt(expirationTime, 10);
      
          if (isTokenValid) {
            setLoggedIn(true);
          } else {
            // Token is expired, clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
          }
        }
      }, []);
      
  return (
    
    <div>
      <form action="/login" method="post">
        <label>Enter Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Enter Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>
      </form>
        
      {loggedIn && <TodoApp />}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Login
