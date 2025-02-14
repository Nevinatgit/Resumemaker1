import React, { useState } from 'react';
import DomHeader from './DomHeader';
import Footer from './Footer';
import { Link } from 'react-router-dom';
//tinymce richtexteditors

export default function ResumeMaker() {
    const [choice, setChoice] = useState(null);

    const choiceHandler = (num) => {
        setChoice(num);
    };

    return (
        <div>
            <DomHeader />
            <h2 style={{fontSize:"50px"}}> Choose a template</h2>
            <div className='d-flex' style={{ flexWrap: "wrap" }}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
                        if(number!=2 && number!=1){
                        return (
                            <div key={number} style={{ 
                                border: number === choice ? '2px solid blue' : 'none',
                             
                            }}>
                                <img 
                                    onClick={() => { choiceHandler(number); }} 
                                    width="500px" 
                                    height="500px" 
                                    src="./images/landingRes.png" 
                                    alt={`Template ${number}`} 
                                />
                            </div>
                        );
                    }else if(number==1){
                        return (
                            <div key={number} style={{ 
                                border: number === choice ? '2px solid blue' : 'none',
                             
                            }}>
                                <img 
                                    onClick={() => { choiceHandler(number); }} 
                                    width="500px" 
                                    height="500px" 
                                    src="./images/resume2.png" 
                                    alt={`Template ${number}`} 
                                />
                            </div>
                        ); 


                    }else{
                        return (
                            <div key={number} style={{ 
                                border: number === choice ? '2px solid blue' : 'none',
                             
                            }}>
                                <img className='m-5'
                                    onClick={() => { choiceHandler(number); }} 
                                    width="400px" 
                                    height="400px" 
                                    src="./images/Redresume.png" 
                                    alt={`Template ${number}`} 
                                />
                            </div>
                        );
                    }
                    })
                }
            </div>
            <div className='d-flex gap-4 justify-content-center align-items-center' style={{ 
                background: "darkgrey", 
                width: "100%", 
                height: "100px", 
                position: 'fixed', 
                bottom: '0', 
                left: '0',
                zIndex: '1000'  // Optional: ensures the footer stays above other content
            }}>
    
                
      <Link 
    to={`/ResumeEditer?id=${choice}&edit=false`}
    className={"btn btn-primary" } 
    style={{ textDecoration: "none", color: 'white' }}
    onClick={(e) => { if (!choice) e.preventDefault(); }}  // Prevent navigation if choice is falsy
>
    Continue Resume
</Link>
<h2 className='text'>OR</h2>
    <Link 
    to={`/ResumeEditer?id=${choice}&edit=true`}
    className={choice ? "btn btn-primary" : "btn btn-disabled"} 
    style={{ textDecoration: "none", color: 'white' }}
    onClick={(e) => { if (!choice) e.preventDefault(); }}  // Prevent navigation if choice is falsy
>
    Choose editing Existing Template
</Link>
                <Link to="/Dashboard" className='btn btn-danger' style={{ textDecoration: "none", color: 'white' }}>Cancel</Link>
            </div>
        </div>
    );
}
