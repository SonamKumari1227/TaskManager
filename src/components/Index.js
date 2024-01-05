import React, { useState, useEffect } from 'react';
import Form from './Form';
import Login from './Login';
import TodoApp from './TodoApp';

import axios from 'axios';


function Index() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticationComplete, setAuthenticationComplete] = useState(false);

  const checkAuthentication = async () => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // If token is present, the user is already logged in
      setLoggedIn(true);
    }

    // Set loading to false to indicate that the initial loading is complete
    setLoading(false);
    // Set authenticationComplete to true
    setAuthenticationComplete(true);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

    
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };
  return (
    <div>
      {loading ? (
        // Render a loading message while checking authentication
        <div>Loading...</div>
      ) : loggedIn ? (
        // Render the Navbar and TodoApp components if logged in
        <div>
       
          <TodoApp  />
        </div>
      ) : (
        // Render the login/signup components if not logged in
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#001f3f', color: '#ffffff' }}>
      <h1>Welcome to To-Do List App</h1>
      <button
        style={{
          backgroundColor: '#004080',
          color: '#ffffff',
          padding: '10px 20px',
          margin: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleSignupClick}
      >
        Signup
      </button>
      <button
        style={{
          backgroundColor: '#004080',
          color: '#ffffff',
          padding: '10px 20px',
          margin: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleLoginClick}
      >
        Login
      </button>

      {showSignup && <Form />}
      {showLogin && <Login />}
    </div>
      )}
</div>
  );
}

export default Index;


