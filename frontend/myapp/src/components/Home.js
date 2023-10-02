import React from 'react';
import { Link, useNavigate,Navigate } from 'react-router-dom';

function Home({auth,setAuth}) {
    console.log(auth);

  const history = useNavigate();
  if (!auth) {
    // If not authenticated, redirect to the login page
    console.log("entered")
    return <Navigate to="/" />;
  }
  // Define a function to handle sign-out
  const handleSignOut = () => {
    // Perform the sign-out logic here, e.g., clearing user authentication tokens, etc.
    // You can also use a state management library like Redux or React Context for global state management.
    
    // After sign-out, redirect to the sign-in page
    setAuth(false);
    history('/signin');
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Home;
