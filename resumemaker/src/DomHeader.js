import React from 'react'
import { Link } from 'react-router-dom'

export default function DomHeader() {
  return (
    <div className='d-flex gap-4 justify-content-center align-items-center' style={{ background: "#F8FAFC", width: "100%", height: "100px" }}>
        <Link
         to="/ResumeMaker" style={{textDecoration:"none"}}>
            Resume Maker
        </Link>
       
        <Link style={{textDecoration:"none"}}
         to="/Blog" >
            Blog
        </Link>
        <Link style={{textDecoration:"none"}}
         to="/FAQ" >
            FAQ
        </Link>
    </div>
  )
}
