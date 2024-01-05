import React, { useState }  from 'react'

import Login from './Login'
function Form() {

    const [showLogin, setShowLogin] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Your form submission logic here
        const formData = new FormData(e.target);
    
        try {
          const response = await fetch('http://localhost:8000/postData', {
            method: 'POST',
            body: formData,
          });
    
          const data = await response.json();
    
          if (data.success) {
            // After successful registration, set showLogin to true
            setShowLogin(true);
          } else {
            console.error('Error registering user:', data.error);
            // Handle registration error
          }
        } catch (error) {
          console.error('Error registering user:', error);
          // Handle fetch error
        }
    };
    
  return (
    <div style={{ backgroundColor: '#001f3f', padding: '20px', color: '#ffffff' }}>
      {showLogin ? (
        // If showLogin is true, render the Login component
        <Login />
      ) : (
        // Otherwise, render the registration form
        <form onSubmit={handleFormSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Enter Name:
            <input type="text" name="name" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </label>

          <br />

          <label style={{ display: 'block', marginBottom: '10px' }}>
            Enter Email:
            <input type="email" name="email" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </label>

          <label style={{ display: 'block', marginBottom: '10px' }}>
            Enter Password:
            <input type="password" name="password" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </label>

          <input
            type="submit"
            value="Submit"
            style={{ backgroundColor: '#004080', color: '#ffffff', padding: '10px', border: 'none', cursor: 'pointer' }}
          />
        </form>
      )}
    </div>

  )
}

export default Form
