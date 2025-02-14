import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { setresumeState } from "./reducer"; // Assuming your action is located in actions.js
import DomHeader from './DomHeader';  // Assuming the DomHeader component is imported
import ResumeEditorToolbar from './ToolBar';  // Assuming this is your toolbar
import Footer from './Footer';  // Assuming Footer is your footer component

const Content = React.memo(({ resumeState, handleChange, display, editorState, fieldName, handledisplay, list, setList }) => {
  const [addmore, setaddmore] = useState(false);

  return (
    <div
      style={{ display: "inline", width: "400px", height: "150px" }}
      onMouseEnter={() => setaddmore(true)}
      onMouseOut={() => setaddmore(false)}
    >
      {!display[fieldName] && <p>Heading</p>}
      <strong>
        {!display[fieldName] && (
          <input
            onChange={handleChange}
            style={{
              fontWeight: editorState.isBold ? "bold" : "",
              fontStyle: editorState.isItalic ? "italic" : "",
              textDecoration: editorState.isUnderlined ? "underline" : "",
              fontSize: editorState.fontSize,
              fontFamily: editorState.fontFamily,
              textAlign: editorState.alignment,
            }}
            value={resumeState[fieldName][0]}
            id="0"
            name={fieldName}
          />
        )}
      </strong>
      <p>Description</p>
      {!display[fieldName] && (
        <textarea
          onChange={handleChange}
          style={{
            border: '2px solid blue',
            width: '450px',
            height: "120px",
            fontWeight: editorState.isBold ? "bold" : "",
            fontStyle: editorState.isItalic ? "italic" : "",
            textDecoration: editorState.isUnderlined ? "underline" : "",
            fontSize: editorState.fontSize,
            fontFamily: editorState.fontFamily,
            textAlign: editorState.alignment,
          }}
          value={resumeState[fieldName][1]}
          id="1"
          name={fieldName}
        />
      )}
    {display[fieldName] && (
  // Check if list[fieldName] is an array
  Array.isArray(list[fieldName]) ? (
    list[fieldName].map((string, index) => (
      <p key={index} style={{
        width: "400px",
        fontWeight: editorState.isBold ? "bold" : "",
        fontStyle: editorState.isItalic ? "italic" : "",
        textDecoration: editorState.isUnderlined ? "underline" : "",
        fontSize: editorState.fontSize,
        fontFamily: editorState.fontFamily,
        textAlign: editorState.alignment
      }}>
        {string}
      </p>
    ))
  ) : (
    // If it's not an array, treat it as a string
    <p style={{
        width: "400px",
        fontWeight: editorState.isBold ? "bold" : "",
        fontStyle: editorState.isItalic ? "italic" : "",
        textDecoration: editorState.isUnderlined ? "underline" : "",
        fontSize: editorState.fontSize,
        fontFamily: editorState.fontFamily,
        textAlign: editorState.alignment
      }}>
        {Array.isArray(list[fieldName])
          ? list[fieldName].map((item, index) => (
              <span key={index}>{item}</span> // Print each element of the array
            ))
          : list[fieldName] // If it's a string, print the string
        }
      </p>
      
  )
)}


      {!display[fieldName] && (
        <button
          className='btn btn-primary mr-2'
          name={fieldName}
          onClick={() => {
            handledisplay(fieldName);
            setList(prevList => ({
                ...prevList,
                [fieldName]: Array.isArray(prevList[fieldName])
                  ? [...prevList[fieldName], resumeState[fieldName][0] + ": " + resumeState[fieldName][1]] // If it's an array, add the new value to it
                  : [resumeState[fieldName][0] + ": " + resumeState[fieldName][1]] // If it's not an array, initialize it as an array with the new value
              }));
              
          }} // Call handledisplay to toggle visibility
          style={{ float: "right" }}
        >
          Add
        </button>
      )}
      {display[fieldName] && (
        <button
          className='btn btn-primary mr-2'
          name={fieldName}
          onClick={() => handledisplay(fieldName)} // Call handledisplay to toggle visibility
          style={{ float: "right" }}
        >
          Add More
        </button>
      )}
    </div>
  );
});

export default function ResumeEditor() {
  const [choice, setChoice] = useState(null);
  const location = useLocation();
  const [resumeState, setResumeState] = useState({
    about: "",
    Experience: ["", ""], // Initialize as an array for the two fields
    skills: ["", ""], // Initialize as an array for the two fields
    language: "",
    hobbies: "",
    references: ["", ""],
    education: ["", ""],
  });
  const [display, setDisplay] = useState({
    contact: false,
    about: false,
    Experience: false,
    skills: false,
    language: false,
    hobbies: false,
    references: false,
    education: false,
  });
  const [list, setList] = useState({});
  const token = useSelector((state) => state.resumeEditor.Token);
  console.log(token);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const queryParams1 = new URLSearchParams(location.search);
  const edit = queryParams1.get('edit');
  console.log(edit)
  useEffect(() => {
    const queryParams1 = new URLSearchParams(location.search);
    const editz = queryParams1.get('edit');
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const id = queryParams.get('id');
      
      console.log(id,token);
      if (id && token) {
        try {
          console.log("sdfg");
          const response = await axios.get(
            'http://localhost:5000/api/resumeRoutes/GetResume',
            {
              params: { id }, // Sending 'id' as a query parameter
              headers: {
                'Authorization': `Bearer ${token}`, // Sending token in the Authorization header
              },
            }
          );

          setResumeState(response.data.existingResume);
          setList(response.data.existingResume)
          handledisplay("skills");

          console.log(response.data.existingResume);
          setDisplay({
            contact: true,
            about: true,
            Experience: true,
            skills: true,
            language: true,
            hobbies: true,
            references: true,
            education: true,
          });


          console.log("wallah");

        } catch (err) {
          // Handle error here
        }
      }
    };
   
    if(editz==="true"){
     
    fetchData(); // Call fetchData inside useEffect
    }
  }, [location.search, token]);

  useEffect(() => {
    console.log(resumeState);
  }, [resumeState]);
  useEffect(() => {
    console.log(list);
  }, [list]);

  const dispatch = useDispatch();
  const editorState = useSelector(state => state.resumeEditor.editorState);

  const handleChange = useCallback((event) => {
    const { name, value, id } = event.target;

    setResumeState((prevState) => {
      if (name === "Experience" || name === "skills" || name === "references" || name === "education") {
        const updatedField = [...prevState[name]];
        updatedField[parseInt(id)] = value;
        return { ...prevState, [name]: updatedField };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  }, []);

  const handledisplay = (fieldName) => {
    setDisplay((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName], // Toggle visibility for the specific field
    }));
    dispatch(setresumeState(resumeState));
  };
  const render=(id)=>{
    let content=null;
    if(id==2){
        content=(
            <div className='d-flex'>
            <div style={{ width: "300px", height: "1355px", background: "#D9EAFD" }}>
              <ResumeEditorToolbar />
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ overflowY: 'scroll', height: "1200px", backgroundColor: 'white', border: '2px solid #000', position: 'relative', background: "#9AA6B2" }}>
              <div className='d-flex gap-3'>
                <div className="m-5" style={{ background: "white", width: "70%" }}>
                  <div className='d-flex' style={{ height: "1250px", backgroundColor: 'black', padding: '10px', background: "white", width: "130%" }}>
                    <div className='d-flex gap-2 flex-column align-items-center bg-danger pt-5' style={{ width: "550px", height: "100%" }}>
                    {editorState.image && <img width="200px" height="200px" style={{borderRadius:"50%"}} src={editorState.image} alt="ddcs" />}
    
                      <div className='p-3 m-5 pb-0 mb-0 pt-0 mt-0'>
                        <h2>Contact Me</h2>
                        <hr />
                        {!display.contact && (<ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}><li style={{ textAlign: 'left', marginBottom: '8px' }}><strong>Name:</strong> <input />  </li><li style={{ textAlign: 'left', marginBottom: '8px' }}><strong>Phone:</strong>  <input />  </li><li style={{ textAlign: 'left', marginBottom: '8px' }}><strong>Email:</strong> <input /> </li></ul>)}
                        {display.contact && (<ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}><li style={{ textAlign: 'left', marginBottom: '8px' }}> <strong>Name:</strong> <span>sdfdsf</span></li><li style={{ textAlign: 'left', marginBottom: '8px' }}><strong>Phone:</strong>  <span>sdfs</span>  </li><li style={{ textAlign: 'left', marginBottom: '8px' }}><strong>Email:</strong> <span>sdfsdf</span> </li></ul>)}
                        {!display.contact && (<button className='btn btn-primary mr-2' name="contact" onClick={() => handledisplay('contact')} style={{ float: "right" }}>Add</button>)}
                      </div>
                      <h2>Education</h2><hr />
                      <Content resumeState={resumeState} handleChange={handleChange} display={display} editorState={editorState} fieldName="education" handledisplay={handledisplay} list={list} setList={setList} />
                      <h2>References</h2><hr />
                      <Content resumeState={resumeState} handleChange={handleChange} display={display} editorState={editorState} fieldName="references" handledisplay={handledisplay} list={list} setList={setList} />
                    </div>
                    <div className='d-flex flex-column gap-3' style={{ width: "550px", paddingTop: "50px" }}>
                      <div className='d-flex flex-column gap-5 m-5 mb-0' style={{ width: "450px" }}>
                        <div><h2>About Us</h2><hr /><p style={{ textAlign: "left" }}>Description</p>
                          {!display.about && (<textarea onChange={handleChange} onClick={() => { setChoice("about"); }} style={{ border: '2px solid blue', width: '450px', height: "120px", fontWeight: editorState.isBold ? "bold" : "", fontStyle: editorState.isItalic ? "italic" : "", textDecoration: editorState.isUnderlined ? "underline" : "", fontSize: editorState.fontSize, fontFamily: editorState.fontFamily, textAlign: editorState.alignment }} value={resumeState.about} name="about" />)}
    
                          {display.about && (<p style={{ fontWeight: editorState.isBold ? "bold" : "", fontStyle: editorState.isItalic ? "italic" : "", textDecoration: editorState.isUnderlined ? "underline" : "", fontSize: editorState.fontSize, fontFamily: editorState.fontFamily, textAlign: editorState.alignment }} >{resumeState.about}</p>)}
                          {!display.about && (<button className='btn btn-primary mr-2' name="about" onClick={() => handledisplay('about')} style={{ float: "right" }}>Add</button>)}
                        </div>
                        <div>
                          <h2>Job Experience</h2><hr />
                          <Content resumeState={resumeState} handleChange={handleChange} display={display} editorState={editorState} fieldName="Experience" handledisplay={handledisplay} list={list} setList={setList} />
                        </div>
                        <div>
                          <h2>Skills</h2><hr />
                          <Content resumeState={resumeState} handleChange={handleChange} display={display} editorState={editorState} fieldName="skills" handledisplay={handledisplay} list={list} setList={setList} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        )
    }
    else {
      content = (
        <div className="resume-container" style={{ backgroundColor: "#F2F5F9", padding: "30px", fontFamily: "Arial, sans-serif" }}>
      
          {/* Main Content Area */}
          <div className="d-flex">
            {/* Sidebar */}
            <ResumeEditorToolbar style={{height:"900px"}}/>
            <div className="sidebar" style={{ width: "300px", backgroundColor: "#E3F2FD", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
             
              <div style={{ marginTop: "30px" }}>
                <h2 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #bbb", paddingBottom: "5px" }}>Contact</h2>
                {!display.contact ? (
                  <ul style={{ listStyleType: "none", padding: 0, marginTop: "10px" }}>
                    <li style={{ marginBottom: "10px" }}>
                      <strong>Name:</strong> <input placeholder="Your Name" style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <strong>Phone:</strong> <input placeholder="Your Phone" style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <strong>Email:</strong> <input placeholder="Your Email" style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
                    </li>
                  </ul>
                ) : (
                  <ul style={{ listStyleType: "none", padding: 0, marginTop: "10px" }}>
                    <li><strong>Name:</strong> <span>John Doe</span></li>
                    <li><strong>Phone:</strong> <span>1234567890</span></li>
                    <li><strong>Email:</strong> <span>john@example.com</span></li>
                  </ul>
                )}
                {!display.contact && (
                  <button className="btn btn-primary" onClick={() => handledisplay("contact")} style={{ marginTop: "10px", width: "100%" }}>
                    Add
                  </button>
                )}
              </div>
            </div>
      
            {/* Main Section */}
            <div className="content" style={{ flex: 1, padding: "20px", marginLeft: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
              <div className="profile text-center" style={{ marginBottom: "30px" }}>
                {editorState.image && (
                  <img
                    src={editorState.image}
                    width="150"
                    height="150"
                    style={{ borderRadius: "50%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                    alt="Profile"
                  />
                )}
              </div>
              <div className="about-section" style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #bbb", paddingBottom: "5px" }}>About Me</h2>
                {!display.about ? (
                  <textarea
                    onChange={handleChange}
                    onClick={() => setChoice("about")}
                    style={{
                      width: "100%",
                      height: "100px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "10px",
                      resize: "none",
                    }}
                    value={resumeState.about}
                    name="about"
                    placeholder="Tell us about yourself"
                  />
                ) : (
                  <p style={{ marginTop: "10px", color: "#555" }}>{resumeState.about}</p>
                )}
                {!display.about && (
                  <button className="btn btn-primary" onClick={() => handledisplay("about")} style={{ marginTop: "10px" }}>
                    Add
                  </button>
                )}
              </div>
      
              {/* Experience Section */}
              <div className="experience-section" style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #bbb", paddingBottom: "5px" }}>Experience</h2>
                <Content
                  resumeState={resumeState}
                  handleChange={handleChange}
                  display={display}
                  editorState={editorState}
                  fieldName="Experience"
                  handledisplay={handledisplay}
                  list={list}
                  setList={setList}
                />
              </div>
      
              {/* Skills Section */}
              <div className="skills-section" style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #bbb", paddingBottom: "5px" }}>Skills</h2>
                <Content
                  resumeState={resumeState}
                  handleChange={handleChange}
                  display={display}
                  editorState={editorState}
                  fieldName="skills"
                  handledisplay={handledisplay}
                  list={list}
                  setList={setList}
                />
              </div>
      
              {/* Education Section */}
              <div className="education-section" style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #bbb", paddingBottom: "5px" }}>Education</h2>
                <Content
                  resumeState={resumeState}
                  handleChange={handleChange}
                  display={display}
                  editorState={editorState}
                  fieldName="education"
                  handledisplay={handledisplay}
                  list={list}
                  setList={setList}
                />
              </div>
      
              {/* References Section */}
              <div className="references-section">
                <h2 style={{ fontSize: "18px", color: "#333", borderBottom: "2px solid #bbb", paddingBottom: "5px" }}>References</h2>
                <Content
                  resumeState={resumeState}
                  handleChange={handleChange}
                  display={display}
                  editorState={editorState}
                  fieldName="references"
                  handledisplay={handledisplay}
                  list={list}
                  setList={setList}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }      
    return(
        <div>
            {content}
        </div>
    )

  }

  return (
    <div>
      <DomHeader />
     
         {render(id)}
      
      <Footer />
    </div>
  );
}
