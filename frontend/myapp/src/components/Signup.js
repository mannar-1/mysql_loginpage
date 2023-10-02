import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

function Signup({ auth, setAuth }) {
  const his = useNavigate();
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [formData, setFormData] = useState({
    student_firstname: '',
    student_lastname: '',
    rollnumber: '',
    classofstudent: '',
    section: '',
    parent_mobile_number: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword to formData
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return; // Don't submit if passwords don't match
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Signup successful');
        setAuth(true);
        his('/home'); // Redirect to the home page after successful signup
      } else {
        const data = await response.json();
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
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
        <h3 style={{ ...signUpStyles, fontWeight: 'bold' }}>Signup</h3>
        <input
          placeholder="Enter First Name"
          type="text"
          id="student_firstname"
          name="student_firstname"
          value={formData.student_firstname}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Last Name"
          type="text"
          id="student_lastname"
          name="student_lastname"
          value={formData.student_lastname}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Roll Number"
          type="text"
          id="rollnumber"
          name="rollnumber"
          value={formData.rollnumber}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Class"
          type="text"
          id="classofstudent"
          name="classofstudent"
          value={formData.classofstudent}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Section"
          type="text"
          id="section"
          name="section"
          value={formData.section}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Parent Mobile Number"
          type="text"
          id="parent_mobile_number"
          name="parent_mobile_number"
          value={formData.parent_mobile_number}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Email"
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Enter Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={inputStyles}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          style={{
            ...inputStyles,
            borderColor: passwordMatchError ? 'red' : '',
          }}
        />
        {passwordMatchError && (
          <p style={{ color: 'red' }}>Passwords don't match</p>
        )}
        <button
          type="submit"
          style={{
            ...buttonStyles,
            backgroundColor: 'red',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#4B0082')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'red')}
        >
          Signup
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/signin" style={signUpStyles}>
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
