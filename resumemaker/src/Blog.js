import React from 'react'

export default function Blog() {
  return (
    <div>
        <h2>Blog</h2>
        <div className='d-flex gap-3 m-5 justify-content-center'>
        <div className="d-flex  flex-column gap-2" style={{ width:"400px", height: "350px",borderRadius:"20px",borderStyle:"solid", borderWidth:"5px" ,borderColor:"coral"
        
        }}>
          <img style={{borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}} width="100%" height="250px" src="./images/Women.jpg"/>
          <div className='mb-2'>
            <h6>Title</h6>
            <p>Contextual tips and best practices to help users craft each section of their resume.</p>
        </div>
        </div>
        <div style={{ width:"400px", height: "250px",borderRadius:"20px",borderStyle:"solid", borderWidth:"5px" ,borderColor:"coral"}}>
        <img style={{borderRadius:"14px"}} width="100%" height="100%" src="./images/Women.jpg"/>
        </div>
        <div style={{ width:"400px", height: "250px",borderRadius:"20px",borderStyle:"solid", borderWidth:"5px" ,borderColor:"coral"}}>
        <img style={{borderRadius:"14px"}} width="100%" height="100%" src="./images/Women.jpg"/>
        </div>
        </div>
    </div>
  )
}
