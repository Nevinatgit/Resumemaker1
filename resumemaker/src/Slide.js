import React, { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Slide() {
    let [count,setCount]=useState(1)
    let imgref= useRef(null)
    let [direction,setDirection]=useState(1)
    let [imageUrl,setimageUrl]= useState("images/slide-01.jpg")
    let IncrementCount=()=>{
      setDirection(1)
        if(count!=10){
        setCount(count+1)
        }
        else{
            setCount(1)
        }
    }
    let decrementCount=()=>{
      setDirection(-1)
      if(count>=-5){
      setCount(count-1)
      }
      else{
          setCount(1)
      }
  }
    const getTranslateX = () => {
    if(direction==1){
      return `-${295 * (count - 1)}px`;
    }else{
      return `-${295 * (count - 1)}px`;
    }
  };
  
  let TranslateX=()=>{
    return `-${299+295 * (count - 1) }px`;
  }
  useEffect(()=>{
    const intervalId = setInterval(() => {
      IncrementCount()
    }, 2000);
    return () => clearInterval(intervalId);
  })
   
  return (
    <div>
    <div className='m-5' >
        <div style={{marginLeft:"10%"}}>
     
        <div>
        <h2 className=' mb-0 ' style={{fontWeight:"600",fontSize:"40px"}}>Our Eyecatching Resumes</h2>
       </div>
        </div>
        <br/>
    </div>
    <div 
  className="m-4 align-items-center  moveleft" 
  style={{
    background:"darkgrey",
    display: "flex",
    transform: direction === 1 ? `translateX(${getTranslateX()})` : `translateX(${getTranslateX()})`,
    transition: count==1?'none':'transform 1s ease'
  }}>
        <div className='d-flex gap-2' style={{background:"darkgrey"}}>
       <img className="p-0 m-0" width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       </div>
       <div className='d-flex' style={{ background:"darkgrey"}}>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/></div> 
       <div className='d-flex' style={{ background:"darkgrey"}}>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/></div> 
       <div className='d-flex' style={{ background:"darkgrey"}}>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/>
       <img width="600px" height="600px" src="./images/landingRes.png"/></div> 
    </div>

      <br/>
    
    </div>
  )
}
