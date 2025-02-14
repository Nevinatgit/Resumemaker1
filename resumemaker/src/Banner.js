import React from 'react'

export default function Banner() {
  return (
    <div className='d-flex justify-content-center align-items-center gap-5 m-5'>
        <div className='' style={{maxWidth:"500px"}}>
        <h1 >Build Resume Better</h1>
        <p className='mt-3 mb-5'>Unlock your career potential with our easy-to-use resume builder. Whether you're entering the job market or advancing your career, we help you craft a professional resume that stands out to employers.</p>
        <button className='btn btn-danger col-5 '>Start Buiding</button>
        </div>
        <div>
            <img width="500px" height="500px"  src="./images/landingRes.png"/>
        </div>
    </div>
  )
}
