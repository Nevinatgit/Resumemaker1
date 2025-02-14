import React from 'react';

export default function Features() {
  const Features = [
    {
      Title: "Ease of type",
      Text: "No experience needed. Our user-friendly interface makes resume building fast and hassle-free."
    },
    {
      Title: "User-Friendly Interface",
      Text: "A clean and simple user interface (UI) that guides users through the resume-building process without confusion."
    },
    {
      Title: "Pre-built Templates",
      Text: "Multiple resume templates to choose from, including modern, professional, creative, and industry-specific designs."
    },
    {
      Title: "Section Customization",
      Text: " Ability to add, remove, or edit sections (e.g., Contact Information, Summary, Skills, Experience, Education, Certifications)."
    },{
        Title: "Resume Guidance",
        Text: "Contextual tips and best practices to help users craft each section of their resume."
      },
      {
        Title: "ATS Compatibility",
        Text: "Templates and layouts optimized for Applicant Tracking Systems, ensuring resumes don’t get rejected by automated hiring tools."
      }
  ];

  const Box = (props) => {
    return (
      <div className="d-flex p-3" style={{ marginLeft:"50px",  width: "400px", height: "170px", background: "lightgreen", borderRadius:"20px" }}>
        <img width="100px" height="100px" src="./images/Test.png"/>
        <div>
        <h2 style={{fontSize:"25px"}}>{props.Title}</h2>
        <p>{props.Text}</p></div>
      </div>
    );
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>Our Features</h1>
      <br/>
      <br/>
      <div  style={{width:"1200px"}} className='d-flex gap-5 justify-content-center  flex-wrap '> 
      {
        Features.map((feature, index) => {
          return <Box key={index} Title={feature.Title} Text={feature.Text} />
        })
      }</div>
      <button className="m-5" style={{background:"lightblue",borderRadius:"10px",width:"300px",height:"40px"}}>Try It Now!!</button>
    </div>

  );
}
