import React, { useState } from 'react';
import RegisterForm from './Register';
import BlogMain from './BlogMain';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [showPop, setShowPop] = useState(false);
  const navigate = useNavigate();
  let Pop = () => {
    console.log("here bruh");
    return (
      <div 
        style={{
          width: "500px", 
          height: "500px", 
          background: "white", 
          borderStyle:"solid", 
          borderRadius:"10px", 
          position: 'fixed',  // Use fixed positioning
          top: "25%",       // Adjust the position from the top
          left: '50%',       // Center it horizontally
          transform: 'translateX(-50%)',  // To ensure it's centered horizontally
          zIndex: 1000       // Ensure it stays above other elements
        }}  
      >
        <div>
          <RegisterForm/>
        </div>
      </div>
    );
  };

  return (
    <div className='d-flex gap-4 justify-content-center align-items-center' style={{ background: "darkgrey", width: "100%", height: "100px" }}>
  <h5
    onClick={() => {
      navigate('/ResumeMaker');
    }}
    style={{ cursor: 'pointer' }}  // Add this to change the cursor
  >
    Resume
  </h5>
  
 
  <h5
    onClick={() => {
      navigate('/Blog');
    }}
    style={{ cursor: 'pointer' }}  // Add this to change the cursor
  >
    Blog
  </h5>
  
  <h5
    onClick={() => setShowPop(!showPop)}
    style={{ cursor: 'pointer' }}  // Add this to change the cursor
  >
    Login
  </h5>

  {/* Conditionally render the Pop component */}
  {showPop && <Pop />}
</div>

  );
}
