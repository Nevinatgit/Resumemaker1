import React, { useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from './reducer';

export default function AuthForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate=useNavigate()
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(true); // State to switch between Register and Login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.password || (isRegister && !formData.email)) {
      setError('All fields are required');
      return;
    }

    // Clear error message before submission
    setError('');
    console.log(formData)
    const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
    console.log(endpoint)
    try {
      
      const response = await axios.post(endpoint, formData);
      if (response.data.token) {
        dispatch(setToken(response.data.token)); // Save JWT token in Redux
        console.log("JWT Token saved:", response.data.token);
      }
      const username=formData.username
      const queryParams = new URLSearchParams( {username }).toString();
      // Handle success
      console.log(response.data.message);  // Show the success message
      if(!isRegister && response.data.success){
        navigate(`/register?${queryParams}`);
      }
       
     
    } catch (err) {
      // Handle errors
      console.error(err.response?.data?.message || 'An error occurred');
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="m-5" style={{ padding: '5px' }}>
      {/* Toggle buttons for Register/Login */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => {setIsRegister(true)
            redirect('/ResumeMaker')
          }}
          style={{
            padding: '10px',
            backgroundColor: isRegister ? '#4CAF50' : '#ddd',
            color: isRegister ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
        <button
          onClick={() => setIsRegister(false)}
          style={{
            padding: '10px',
            backgroundColor: !isRegister ? '#4CAF50' : '#ddd',
            color: !isRegister ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        {/* Username field */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '14px'
            }} 
          />
        </div>

        {/* Email field (only for Register form) */}
        {isRegister && (
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '14px'
              }} 
            />
          </div>
        )}

        {/* Password field */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: '14px'
            }} 
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer'
          }}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '10px' }}>
        {isRegister ? (
          <p>Already have an account? <button onClick={() => setIsRegister(false)} style={{ color: '#4CAF50', background: 'none', border: 'none', cursor: 'pointer' }}>Login here</button></p>
        ) : (
          <p>Don't have an account? <button onClick={() => setIsRegister(true)} style={{ color: '#4CAF50', background: 'none', border: 'none', cursor: 'pointer' }}>Register here</button></p>
        )}
      </div>
    </div>
  );
}
