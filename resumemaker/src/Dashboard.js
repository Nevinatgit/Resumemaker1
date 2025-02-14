import React from 'react'
import Header from './Header'
import Footer from './Footer'
import DomHeader from './DomHeader'

export default function Dashboard() {
  return (
    <div className='d-flex gap-5 flex-column'  style={{width:"100%",height:"auto"}}>
        <DomHeader/>
          <div className='d-flex gap-5 flex-column container'  style={{width:"100%",height:"auto"}}>
                 <div className='d-flex flex-column  container justify-content-center' style={{width:"100%",height:"auto"}}>
                    <div className='d-flex p-5 pb-0 justify-content-center gap-5' style={{width:"100%",height:"500px",background:"#D9EAFD"}}>
                      <img className="me-5" width="400px" height="400px" src="./images/ResumeDash.jpg"/>
                      <div className='d-flex flex-column align-items-center gap-1'>
                      <p className='ms-5   fw-bold' style={{fontSize:"60px"}}>Create Your Resume today !!</p>
                      <p>Contextual tips and best practices to help users craft each section of their resume.Contextual tips and best practices to help users craft each section of their resume.Contextual tips and best practices to help users craft each section of their resume.</p>
                      <button className='btn btn-danger col-4'>Build Now</button>
                      </div>
                    </div>
                    <div   className='d-flex p-5 pb-0 justify-content-center gap-5' style={{width:"100%",height:"500px",background:"#BCCCDC"}}>
                    <div className='d-flex flex-column align-items-center gap-1'>
                      <p className='ms-5   fw-bold' style={{fontSize:"60px"}}>Create Your Resume today !!</p>
                      <p>Contextual tips and best practices to help users craft each section of their resume.Contextual tips and best practices to help users craft each section of their resume.Contextual tips and best practices to help users craft each section of their resume.</p>
                      <button className='btn btn-danger col-4'>Build Now</button>
                      </div>
                    <img width="400px" height="400px" src="./images/cover.jpg"/>
                    </div>
                    <div   className='d-flex p-5 justify-content-center gap-5' style={{width:"100%",height:"500px",background:"#9AA6B2"}}>
                    <img width="400px" height="400px" src="./images/cover.jpg"/>
                    <div className='d-flex flex-column align-items-center gap-1'>
                      <p className='ms-5   fw-bold' style={{fontSize:"60px"}}>Create Your Resume today !!</p>
                      <p>Contextual tips and best practices to help users craft each section of their resume.Contextual tips and best practices to help users craft each section of their resume.Contextual tips and best practices to help users craft each section of their resume.</p>
                      <button className='btn btn-danger col-4'>Build Now</button>
                      </div>
                    </div>
                </div>
               
            </div>
        <Footer/>
    </div>
  )
}
