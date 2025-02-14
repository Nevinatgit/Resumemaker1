import React from 'react'

export default function Steps() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center m-5' style={{background:"lightgrey",borderRadius:"20px"}}>
       <div className='mt-5'>
            <h1>Easy Steps To Your Resume</h1>
            <p>Unlock your career potential with our easy-to-use resume builder. Whether you're entering the job market or advancing your career, we help you craft a professional resume that stands out to employers.</p>
           
        </div>
    <div className='d-flex w-100 container align-items-center justify-content-center  gap-5' >
       <img width="500px" height="500px" src="./images/Stairs.png"/>
        <div className='d-flex flex-column gap-4 m-3' style={{}}>
            <div className="d-flex gap-2"  style={{width:"700px", height:"100px"}}>
              <div style={{width:"100px",height:"100px",background:"blue",borderRadius:"10px"}}>
              <p style={{fontSize:"65px",color:"yellow"}}>1</p></div>
              <div className='d-flex flex-column' style={{textAlign:"left"}}>
              <p className='mt-1' style={{fontSize:"20px",fontWeight:"500"}}>  Sign In</p>
              <p>Sign in to your account with your usename and password</p></div>
            </div>
            <div className="d-flex gap-2"   style={{width:"700px", height:"100px"}}>
            <div style={{width:"100px",height:"100px",background:"blue",borderRadius:"10px"}}>
              <p style={{fontSize:"65px",color:"yellow"}}>2</p></div>
              <div className='d-flex flex-column' style={{textAlign:"left"}}>
            <p className='mt-1' style={{fontSize:"20px",fontWeight:"500"}}>  Click on the Make</p>
            <p>Sign in to your account with your usename and password</p></div>
            </div>
            <div className="d-flex gap-2"   style={{width:"700px", height:"100px"}}>
            <div style={{width:"100px",height:"100px",background:"blue",borderRadius:"10px"}}>
            <p style={{fontSize:"65px",color:"yellow"}}>3</p></div>
            <div className='d-flex flex-column' style={{textAlign:"left"}}>
            <p className='mt-1' style={{fontSize:"20px",fontWeight:"500"}}> Fill in your details</p>
            <p>Unlock your career potential with our easy-to-use resume builder. </p>
            </div></div>
           
        </div>
    
    </div>
    <button className='btn btn-primary col-5 m-5 '>Build Now</button>
    </div>
  )
}
