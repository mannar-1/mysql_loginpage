import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signin({ auth, setAuth }) {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Signin successful');
        setAuth(true);
        history('/home');
      } else {
        const data = await response.json();
        console.error('Signin failed:', data.message);
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  const gradientBackground = {
    background: 'linear-gradient(to bottom, #4B0082, #8A2BE2)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const signUpStyles = {
    color: 'white',
    opacity: 0.9,
    transition: 'color 0.3s ease-in-out',
    cursor: 'pointer',
  };

  const buttonStyles = {
    width: '320px',
    padding: '10px',
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'block',
    opacity: 0.9,
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  };

  const inputStyles = {
    width: '300px',
    padding: '10px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'black',
    display: 'block',
  };

  return (
    <div style={gradientBackground}>
      <div style={{ marginTop: '20px' }}></div>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          textAlign: 'center',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
        }}
      >
        <h2 style={{ ...signUpStyles }}>Sign In</h2>
        <input
          placeholder="Enter Email"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyles}
        />
        <button
          type="submit"
          style={{
            ...buttonStyles,
            backgroundColor: 'red',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#4B0082')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'red')}
        >
          Sign In
        </button>
      </form>
      <p style={signUpStyles}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Signin;
