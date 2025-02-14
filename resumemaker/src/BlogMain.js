import React from 'react'
import Footer from './Footer'
import DomHeader from './DomHeader'

export default function BlogMain() {
  let BlogCard=()=>{
    return(
      <div className="d-flex  flex-column gap-2" style={{ width:"400px", height: "450px" }}>
                <img width="100%" height="250px" src="./images/Women.jpg"/>
                <div className='mb-2'>
                  <p style={{textAlign:"left"}}>22/11/2024 | 10:24</p>
                  <h6 style={{fontSize:"25px",fontWeight:"500",textAlign:"left"}}>How To Speak in your Resume</h6>
                  <p style={{textAlign:"left"}}>Contextual tips and best practices to help users craft each section of their resume.
                  Contextual tips and best practices to help users craft each section of their resume.
                  Contextual tips and best practices to help users craft each section of their resume.
                 
                  </p>
                </div>
              </div>
    )
  }
  let Heading=(prop)=>{
    return(
      <h2 style={{ marginRight: '850px', marginBottom: '50px' }}>
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          paddingBottom: '7px', // Space between text and underline
        }}
      >
       {prop.text}
        <span
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '110%',
            height: '5px', // Thicker underline
            backgroundColor: '#BCCCDC',
            borderRadius: '5px', // Curvy ends
          }}
        ></span>
      </span>
    </h2>
    )
  }
  return (
    <div>
        <DomHeader/>
        <div>
            <br/>
           <div style={{fontSize:"50px",width:"100%",height:"300px",background:"#9AA6B2",display:"flex",justifyContent:"center",alignItems:"center"}}>
                Elevate Your Carrer with our Blogs
           </div>
            <br/>
            <br/>
            
        </div>
        
        <br/>
        <Heading text="Recruiter Blogs"/>
        <div className='m-5'>
           <div className='d-flex gap-5 m-5 justify-content-center'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
        </div>
       
        <div className='m-5'>
        <Heading text="Resume Blogs"/>
           <div className='d-flex gap-5 m-5 justify-content-center'>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
        </div>
        <div className='m-5'>
        <Heading text="Carrer Blogs"/>
            <div className='d-flex gap-5 m-5 justify-content-center'>
            <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}











