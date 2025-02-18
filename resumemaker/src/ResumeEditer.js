import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import DomHeader from "./DomHeader";
import Footer from "./Footer";
import ResumeEditorToolbar from "./ToolBar";

const editorState = {
  image: 'https://example.com/profile.jpg',  // Profile image URL
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  fontSize: '16px',
  fontFamily: 'Arial, sans-serif',
  alignment: 'left'
};



const App = () => {
  const [id, setId] = useState(2);
  const { resumeStateX1 } = useSelector(state => state.resumeEditor);
  const [resumestateX, setResumestateX] = useState(resumeStateX1 || {}); 
  const [editorState,seteditorstate] =useState({
   
      fontSize: "16",
      isBold: true,
      isItalic: false,
      isUnderlined: false,
      alignment: 'left',
      textColor: '#000000',
      highlightColor: '#FFFF00',
      fontFamily: 'Arial',
      bulletList: false,
      image: null,  // Image state to store the image URL
   
  })// Ensure there's an initial state

  useEffect(() => {
    console.log(resumestateX);
  }, [resumestateX]);

  const render = (id) => {
    let content = null;

    if (id === 2) {
      content = (
        <div className="d-flex">
        
          <div
            className="d-flex justify-content-left gap-5 align-items-center flex-row"
            style={{
              backgroundColor: 'white',
              width:"100%",
              background: '#9AA6B2',
            }}
          >   <div style={{height:"1400px"}}>
            <ResumeEditorToolbar />
          </div>

            <div className="d-flex gap-3">
              <div className="m-5" style={{ background: 'white', width: '70%' }}>
                <div
                  className="d-flex"
                  style={{
                    height: '1250px',
                    backgroundColor: 'black',
                   
                    background: 'white',
                    width: '130%',
                  }}
                >
                  <div
                    className="d-flex gap-2 flex-column align-items-center bg-danger "
                    style={{ width: '550px', height: '100%' }}
                  >
                    {resumestateX.image && (
                      <img
                        width="200px"
                        height="200px"
                        style={{ borderRadius: '50%' }}
                        src={resumestateX.image}
                        alt="Profile"
                      />
                    )}
                    <div >
                      <h2>Contact Me</h2>
                      <hr />
                 
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                          <li style={{ textAlign: 'left', marginBottom: '8px' }}>
                            <strong>Name:</strong> {resumestateX.contact?.name || 'N/A'}
                          </li>
                          <li style={{ textAlign: 'left', marginBottom: '8px' }}>
                            <strong>Phone:</strong> {resumestateX.contact?.phone || 'N/A'}
                          </li>
                          <li style={{ textAlign: 'left', marginBottom: '8px' }}>
                            <strong>Email:</strong> {resumestateX.contact?.email || 'N/A'}
                          </li>
                        </ul>
                     
                    </div>
                    <h2>Education</h2>
                    <hr />
                    <div>
                      {resumestateX.education?.length ? (
                        resumestateX.education.map((edu, index) => (
                          <div key={index}>
                            <p>
                              <strong>College:</strong> {edu.college}
                            </p>
                            <p>
                              <strong>Time Attended:</strong> {edu.timeAttended}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No education information available.</p>
                      )}
                    </div>
                    <h2>References</h2>
                    <hr />
                    <div>
                      {resumestateX.references?.length ? (
                        resumestateX.references.map((ref, index) => (
                          <div key={index}>
                            <p>
                              <strong>Name:</strong> {ref.refererName}
                            </p>
                            <p>
                              <strong>Designation:</strong> {ref.refererDesignation}
                            </p>
                            <p>
                              <strong>Quote:</strong> {ref.quote}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No references available.</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-3" style={{ width: '550px', paddingTop: '50px' }}>
                    <div className="d-flex flex-column gap-5 m-5 mb-0" style={{ width: '450px' }}>
                      <div>
                        <h2>About Us</h2>
                        <hr />
                        <p style={{ textAlign: 'left' }}>{resumestateX.about || 'No about information available.'}</p>
                       
                      </div>
                      <div>
                        <h2>Job Experience</h2>
                        <hr />
                        {resumestateX.experience?.length ? (
                          resumestateX.experience.map((job, index) => (
                            <div key={index}>
                              <p>
                                <strong>Job Title:</strong> {job.jobTitle}
                              </p>
                              <p>
                                <strong>Job Description:</strong> {job.jobDescription}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No job experience available.</p>
                        )}
                      </div>
                      <div>
                        <h2>Skills</h2>
                        <hr />
                        <p>{resumestateX.skills || 'No skills available.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className=" mt-5 p-5" style={{
         
          width:"100%",
          background: '#9AA6B2',
        }}>
        <div className="d-flex justify-content-center " style={{
          backgroundColor: 'white',
          width:"100%",
          background: '#9AA6B2',
        }}>
        
          <div className="d-flex " style={{height:"700px"}}>
            <div
              className="sidebar"
              style={{
                height:"1000px",
                width: '400px',
                backgroundColor: '#E3F2FD',
                padding: '20px',
              
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
            
              <div style={{ marginTop: '30px' }}>
                <div style={{width:"200px",height:"200px" , borderRadius:"50%"}}>
                  <img  />
                </div>
                <h2 style={{ fontSize: '18px', color: '#333', borderBottom: '2px solid #bbb', paddingBottom: '5px' }}>
                  Contact
                </h2>
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Name:</strong> {resumestateX.contact?.name || 'N/A'}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Phone:</strong> {resumestateX.contact?.phone || 'N/A'}
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Email:</strong> {resumestateX.contact?.email || 'N/A'}
                  </li>
                </ul>
              </div>
              </div>
            </div>
        
          <div className="d-flex p-4 pt-5 flex-column gap-5" style={{width:"850px",height:"1000px",backgroundColor:"white"}}>
              <div>
                <h2 style={{ fontSize: '18px', color: '#333', borderBottom: '2px solid #bbb', paddingBottom: '5px' }}>
                  About
                </h2>
                <p>{resumestateX.about || 'No details provided'}</p>
              </div>
              <div>
                <h2 style={{ fontSize: '18px', color: '#333', borderBottom: '2px solid #bbb', paddingBottom: '5px' }}>
                  Education
                </h2>
                {resumestateX.education?.length ? (
                  resumestateX.education.map((edu, index) => (
                    <div key={index}>
                      <p>
                        <strong>College:</strong> {edu.college}
                      </p>
                      <p>
                        <strong>Time Attended:</strong> {edu.timeAttended}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No education available.</p>
                )}
              </div>
              <div>
                <h2 style={{ fontSize: '18px', color: '#333', borderBottom: '2px solid #bbb', paddingBottom: '5px' }}>
                  Job Experience
                </h2>
                {resumestateX.experience?.length ? (
                  resumestateX.experience.map((job, index) => (
                    <div key={index}>
                      <p>
                        <strong>Job Title:</strong> {job.jobTitle}
                      </p>
                      <p>
                        <strong>Job Description:</strong> {job.jobDescription}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No job experience available.</p>
                )}
              </div>
              <div>
                <h2 style={{ fontSize: '18px', color: '#333', borderBottom: '2px solid #bbb', paddingBottom: '5px' }}>
                  References
                </h2>
                {resumestateX.references?.length ? (
                  resumestateX.references.map((ref, index) => (
                    <div key={index}>
                      <p>
                        <strong>Name:</strong> {ref.refererName}
                      </p>
                      <p>
                        <strong>Designation:</strong> {ref.refererDesignation}
                      </p>
                      <p>
                        <strong>Quote:</strong> {ref.quote}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No references available.</p>
                )}
              </div>
              <div>
                <h2 style={{ fontSize: '18px', color: '#333', borderBottom: '2px solid #bbb', paddingBottom: '5px' }}>
                  Skills
                </h2>
                <p>{resumestateX.skills || 'No skills available.'}</p>
              </div>
              </div>
        </div></div>
      );
    }
    return content;
  };

  return (
    <div>
        <DomHeader />
        <div className="d-flex gap-3 align-items-center justify-content-start ps-5" style={{ width: '100%', background: '#FFFFE0' }}>
        <h2>Change the Template:</h2>
        <button className="btn btn-primary mt-5" onClick={() => setId(2)}>Red Resume</button>
        <button className="btn btn-primary mt-5" onClick={() => setId(1)}>Simple Resume</button>
</div>

      
      {render(id)}
           <Footer />
    </div>
  );
};

export default App;
