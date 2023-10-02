// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup({auth,setAuth}) {
    const his = useNavigate();

  const [formData, setFormData] = useState({
    student_firstname: '',
    student_lastname: '',
    rollnumber: '',
    class: '',
    section: '',
    parent_mobile_number: '',
    email:'',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="student_firstname">First Name</label>
          <input
            type="text"
            id="student_firstname"
            name="student_firstname"
            value={formData.student_firstname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="student_lastname">Last Name</label>
          <input
            type="text"
            id="student_lastname"
            name="student_lastname"
            value={formData.student_lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rollnumber">Roll Number</label>
          <input
            type="text"
            id="rollnumber"
            name="rollnumber"
            value={formData.rollnumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="class">Class</label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="section">Section</label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="parent_mobile_number">Parent Mobile Number</label>
          <input
            type="text"
            id="parent_mobile_number"
            name="parent_mobile_number"
            value={formData.parent_mobile_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default Signup;
