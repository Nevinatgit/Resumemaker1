import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import DomHeader from "./DomHeader";
import Footer from "./Footer";
import ResumeEditorToolbar from "./ToolBar";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Infogather from "./infogather";

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
  const token = useSelector(state => state.resumeEditor.Token);
  const section = useSelector(state => state.resumeEditor.selectedAttribute);
  const [resumestateX, setResumestateX] = useState(resumeStateX1 || {});
  const { editorState } = useSelector(state => state.resumeEditor);
  const location = useLocation();
  const navigate= useNavigate()
  const queryParams1 = new URLSearchParams(location.search);
  const editz = queryParams1.get('edit');
 
  const queryParams = new URLSearchParams(location.search);
  const [labels, setLabels] = useState({

    about: false,
    experience: false,
    skills: false,
    softSkills: false,
    education: false,
    contact: false,
    references: false,
    image: false
  });

  const handleMouseOver = (label) => {
    setLabels((prevLabels) => ({
      ...prevLabels,
      [label]: true, // Set the corresponding label to true
    }));
  };

  const handleMouseLeave = (label) => {
    setLabels((prevLabels) => ({
      ...prevLabels,
      [label]: false, // Reset the label to false when mouse leaves
    }));
  };

  useEffect(() => {
   // console.log(editorState);
  }, [editorState]);

  useEffect(() => {
    const queryParams1 = new URLSearchParams(location.search);
    const editz = queryParams1.get('edit');
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get('id');
      const username = queryParams.get('username');
    
      setId(id)
      const image= await axios.get('http://localhost:5000/api/resumeRoutes/GetImage',{
      params:{username:username,id:5}})
      console.log(image.data.image.imageUrl,"imageurkl")
      
      if (id && token) {
        try {
          
          const response = await axios.get(
            'http://localhost:5000/api/resumeRoutes/GetResumeUser',
            {
              params: { username: username },
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          console.log(response)
          //console.log(response.data.existingResume[id].resumeState);
          setResumestateX({
            ...response.data.existingResume[id].resumeState,
            image: image.data.image.imageUrl
          });
          
          
          console.log("wallah");

        } catch (err) {
          // Handle error here
        }
      }
    };
   
    if (editz === "true") {
      
      fetchData(); // Call fetchData inside useEffect
    }
  }, [location.search, token]);

  useEffect(() => {
   
  }, [resumestateX]);

  const render = (id) => {
    let content = null;

    if (id == 2) {
      content = (
        <div className="d-flex">
          <div
            className="d-flex justify-content-left gap-5 align-items-center flex-row"
            style={{
              backgroundColor: 'white',
              width: '100%',
              background: '#9AA6B2',
            }}
          >
            <div style={{ height: "1400px" }}>
              <ResumeEditorToolbar id={id} />
            </div>

            <div className="d-flex gap-3">
              <div id="Resume" className="m-5" style={{ background: 'white', width: '70%' }}>
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
                    className="d-flex gap-2 flex-column align-items-center bg-danger"
                    style={{ width: '550px', height: '100%' }}
                  >
                    {console.log(resumestateX.image,"image")}
                    {resumestateX.image ? editz=="true"?( <img
                        className="mt-5 mb-2"
                        width="200px"
                        height="200px"
                        style={{ borderRadius: '50%' }}
                        src={resumestateX.image}
                        alt="Profile"
                      />):(
                      
                      <img
                        className="mt-5 mb-2"
                        width="200px"
                        height="200px"
                        style={{ borderRadius: '50%' }}
                        src={URL.createObjectURL(resumestateX.image)}
                        alt="Profile"
                      />
                    ):""}
                    <div onMouseOver={() => handleMouseOver("contact")} onMouseLeave={() => handleMouseLeave("contact")}>
                      <h2>Contact Me</h2>
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
                      {labels.contact && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=contact")}}>Edit</button>}
                    </div>
                    <h2>Education</h2>
                    <div onMouseOver={() => handleMouseOver("education")} onMouseLeave={() => handleMouseLeave("education")}>
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
                      {labels.education && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=education")}}>Edit</button>}
                    </div>
                    <h2>References</h2>
                    <hr />
                    <div onMouseOver={() => handleMouseOver("references")} onMouseLeave={() => handleMouseLeave("references")}>
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
                      {labels.references && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=references")}}>Edit</button>}
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-3" style={{ width: '550px', paddingTop: '50px' }}>
                    <div className="d-flex flex-column gap-5 m-5 mb-0" style={{ width: '450px' }}>
                      <div onMouseOver={() => handleMouseOver("about")} onMouseLeave={() => handleMouseLeave("about")}>
                        <h2>About Us</h2>
                        <hr />
                        <p
                          style={{
                            textAlign: editorState["about"]?.alignment || 'left',
                            fontWeight: editorState["about"]?.isBold ? 'bold' : 'normal',
                            fontSize: `${editorState["about"]?.fontSize || 16}px`,
                            fontStyle: editorState["about"]?.isItalic ? 'italic' : 'normal',
                            textDecoration: editorState["about"]?.isUnderlined ? 'underline' : 'none',
                            color: editorState["about"]?.textColor || '#000000',
                            fontFamily: editorState["about"]?.fontFamily || 'Arial',
                            listStyleType: editorState["about"]?.bulletList ? 'disc' : 'none',
                          }}
                        >
                          {resumestateX.about || 'No about information available.'}
                        </p>
                        {labels.about && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=about")}}>Edit</button>}
                      </div>

                      <div onMouseOver={() => handleMouseOver("experience")} onMouseLeave={() => handleMouseLeave("experience")}>
                        <h2>Job Experience</h2>
                        <hr />
                        {resumestateX.experience?.length ? (
                          resumestateX.experience.map((job, index) => (
                            <div key={index}>
                              <p
                                style={{
                                  textAlign: editorState["experience"]?.alignment || 'left',
                                  fontWeight: editorState["experience"]?.isBold ? 'bold' : 'normal',
                                  fontSize: `${editorState["experience"]?.fontSize || 16}px`,
                                  fontStyle: editorState["experience"]?.isItalic ? 'italic' : 'normal',
                                  textDecoration: editorState["experience"]?.isUnderlined ? 'underline' : 'none',
                                  color: editorState["experience"]?.textColor || '#000000',
                                  fontFamily: editorState["experience"]?.fontFamily || 'Arial',
                                  listStyleType: editorState["experience"]?.bulletList ? 'disc' : 'none',
                                }}
                              >
                                <strong>Job Title:</strong> {job.jobTitle}
                              </p>
                              <p
                                style={{
                                  textAlign: editorState["experience"]?.alignment || 'left',
                                  fontWeight: editorState["experience"]?.isBold ? 'bold' : 'normal',
                                  fontSize: `${editorState["experience"]?.fontSize || 16}px`,
                                  fontStyle: editorState["experience"]?.isItalic ? 'italic' : 'normal',
                                  textDecoration: editorState["experience"]?.isUnderlined ? 'underline' : 'none',
                                  color: editorState["experience"]?.textColor || '#000000',
                                  fontFamily: editorState["experience"]?.fontFamily || 'Arial',
                                  listStyleType: editorState["experience"]?.bulletList ? 'disc' : 'none',
                                }}
                              >
                                <strong>Job Description:</strong> {job.jobDescription}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No job experience available.</p>
                        )}
                          {labels.experience && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=experience")}}>Edit</button>}
                      </div>

                      <div onMouseOver={() => handleMouseOver("skills")} onMouseLeave={() => handleMouseLeave("skills")}>
                        <h2>Skills</h2>
                        <hr />
                        <div>
                          {resumestateX.skills?.length ? (
                            <ul>
                              {resumestateX.skills.map((skill, index) => (
                                <li key={index}>
                                  <strong
                                    style={{
                                      textAlign: editorState["skills"]?.alignment || 'left',
                                      fontWeight: editorState["skills"]?.isBold ? 'bold' : 'normal',
                                      fontSize: `${editorState["skills"]?.fontSize || 16}px`,
                                      fontStyle: editorState["skills"]?.isItalic ? 'italic' : 'normal',
                                      textDecoration: editorState["skills"]?.isUnderlined ? 'underline' : 'none',
                                      color: editorState["skills"]?.textColor || '#000000',
                                      fontFamily: editorState["skills"]?.fontFamily || 'Arial',
                                      listStyleType: editorState["skills"]?.bulletList ? 'disc' : 'none',
                                    }}
                                  >
                                    {skill}
                                  </strong>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No skills available.</p>
                          )}
                            {labels.skills && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=skill")}}>Edit</button>}
                        </div>
                      </div>

                      <div onMouseOver={() => handleMouseOver("softSkills")} onMouseLeave={() => handleMouseLeave("softSkills")}>
                        <h2>Soft Skills</h2>
                        <hr />
                        <div>
                          {resumestateX.softSkills?.length ? (
                            <ul>
                              {resumestateX.softSkills.map((skill, index) => (
                                <li key={index}>
                                  <strong
                                    style={{
                                      textAlign: editorState["softSkills"]?.alignment || 'left',
                                      fontWeight: editorState["softSkills"]?.isBold ? 'bold' : 'normal',
                                      fontSize: `${editorState["softSkills"]?.fontSize || 16}px`,
                                      fontStyle: editorState["softSkills"]?.isItalic ? 'italic' : 'normal',
                                      textDecoration: editorState["softSkills"]?.isUnderlined ? 'underline' : 'none',
                                      color: editorState["softSkills"]?.textColor || '#000000',
                                      fontFamily: editorState["softSkills"]?.fontFamily || 'Arial',
                                      listStyleType: editorState["softSkills"]?.bulletList ? 'disc' : 'none',
                                    }}
                                  >
                                    {skill}
                                  </strong>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No soft skills available.</p>
                          )}
                                  {labels.softSkills && <button className="btn btn-primary" onClick={()=>{navigate("/ResumeData?id=softskill")}}>Edit</button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return content;
  };

  return (
    <div>
      <DomHeader />
      {render(id)}
      <Footer />
    </div>
  );
};

export default App;
