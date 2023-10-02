// Signin.js
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
        body: JSON.stringify({ email, password }), // Send firstname and password as JSON data
      });

      if (response.ok) {
        console.log('Signin successful');
        setAuth(true);
        // You can perform a redirect here if needed
         history('/home'); // Redirect to the home page after successful signin
      } else {
        const data = await response.json();
        console.error('Signin failed:', data.message);
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log('Signin successful');
//         history('/home'); // Redirect to the home page after successful signin
//       } else {
//         const data = await response.json();
//         console.error('Signin failed:', data.message);
//       }
//     } catch (error) {
//       console.error('Error during signin:', error);
//     }
//   };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Signin;
