import logo from './logo.svg';
import './App.css';
import DomHeader from './DomHeader';
import Footer from './Footer';

let Questionset=(prop)=>{
  return(
    <div className='d-flex   m-5'>
          {prop.i=="l" &&(<img width="250px" height="250px" src="https://img.freepik.com/free-vector/organic-flat-people-asking-questions-set_23-2148914081.jpg?t=st=1734513175~exp=1734516775~hmac=b4057320abb16f6700f1126a1ad1fcfd9575f461eb98f8ca413d2f7596f13e1c&w=1060"/>)}
          <div
  className="d-flex flex-column justify-content-center"
  style={{
    marginLeft: `${prop.i === 'r' ? '23.5%' : '7%'}`,
  }}
>
            <div className=' d-flex  flex-column justify-content-center align-items-center' style={{width:"700px",height:"200px"}}>
              <h2>{prop.heading1}</h2>
              <p>{prop.text1}</p>
            </div>
            <div className='flex-column d-flex justify-content-center align-items-center' style={{width:"700px",height:"200px"}}>
              <h2>{prop.heading2}</h2>
              <p>{prop.text2}</p>
            </div>
           </div>
           {prop.i=="r" &&(<img style={{marginLeft:"20px"}} width="250px" height="250px" src="https://img.freepik.com/free-vector/organic-flat-people-asking-questions-set_23-2148914081.jpg?t=st=1734513175~exp=1734516775~hmac=b4057320abb16f6700f1126a1ad1fcfd9575f461eb98f8ca413d2f7596f13e1c&w=1060"/>)}
      </div>
  )
}

export default function  FAQ() {
  return (
    <div className="d-flex flex-column justify-content-center">
      <DomHeader/>
      <div className='mb-5' style={{fontSize:"50px",width:"100%",height:"300px",background:"#9AA6B2",display:"flex",justifyContent:"center",alignItems:"center"}}>
               FAQ
           </div>
      <Questionset heading1="What is a resume builder?" 
      text1="A resume builder is an online tool that helps you create a professional resume quickly and easily by guiding you through a step-by-step process. 
                It provides templates, customizable sections, and tips to ensure your resume meets industry standards."
      heading2="Is it free to use the resume builder?"      
      text2="Yes, our basic resume builder is completely free to use! You can create, edit, and download your resume at no cost. 
                We also offer premium features for advanced customization and additional tools for a small fee."    
      i="l"
      />
      <Questionset heading1=" How do I create a resume using your website?"
      text1="To create a resume, simply sign up for an account on our website. Once logged in, you can choose from a variety of resume templates. Fill in your personal information, education, work experience, skills, and other details. After completing the sections, you can preview your resume, make any necessary edits, and then download it in your preferred format (PDF, Word, etc.)."
      heading2="Can I customize my resume template?"
      text2="Yes! Our website offers a variety of templates, and each one is fully customizable. You can adjust fonts, colors, layouts, and the sections to fit your personal style. This allows you to create a unique resume that reflects your personality and professional experience."
      i="r"
/>
      <Questionset
          heading1="Is it free to create a resume on your website?"
          text1="Yes, you can create a basic resume for free. However, premium features such as additional templates, advanced customization options, and the ability to download your resume in multiple formats may require a subscription or one-time payment."
          heading2="Can I save and edit my resume later?"
          text2="Absolutely! Once you've started building your resume, you can save it to your account and return to edit it whenever needed. You can update your information and make changes until you're satisfied with the final version."
          i="l"
    />
      <Footer/>
    </div>
  );
}

