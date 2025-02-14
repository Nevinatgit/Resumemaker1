import React from 'react'

export default function Review() {
  return (
    <div style={{marginTop:"100px"}}>
    <div  style={{marginBottom:"100px"}}>
    <div style={{background:"lightgrey"}} className='d-flex flex-column container  '>
        <div className='d-flex ' style={{gap:"100px"}}>
        <img  width="400px" height="350px" src="./images/Review1.png"/>
        <div className='m-5 ' style={{width:"900px"}} >
        <h2 style={{fontSize:"40px",fontWeight:"700"}}>We would love to share what people share about us</h2>
      </div>
      
        </div>
        <div className='d-flex container gap-3' style={{marginLeft:"0.5%"}}>
          <div style={{background:"lightgrey", width:"400px", height: "190px",borderRadius:"20px",borderStyle:"solid", borderWidth:"5px" ,borderColor:"green"}}>
          <h2 style={{fontSize:"25px"}}>The headline</h2>
          <p style={{fontWeight:"600",color:"brown"}}>Contextual tips and best practices to help users craft each section of their resume.</p>
           </div>
           <div style={{ width:"400px", height: "190px",borderRadius:"20px",borderStyle:"solid", borderWidth:"5px" ,borderColor:"green"}}>
           <h2 style={{fontSize:"25px"}}>The headline</h2>
           <p style={{fontWeight:"600",color:"brown"}}>Contextual tips and best practices to help users craft each section of their resume.</p>
          </div> <div style={{ width:"400px", height: "190px",borderRadius:"20px",borderStyle:"solid", borderWidth:"5px" ,borderColor:"green"}}>
          <h2 style={{fontSize:"25px"}}>The headline</h2>
          <p style={{fontWeight:"600",color:"brown"}}>Contextual tips and best practices to help users craft each section of their resume.</p>
          </div>
    </div>
        <img style={{marginLeft:"72%" }}  width="400px" height="300px" src="./images/Review2.png"/>

    </div>
   
    </div>
    </div>
  )
}
