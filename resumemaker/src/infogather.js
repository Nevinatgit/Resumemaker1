import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { setresumeState } from './reducer'; 
import DomHeader from './DomHeader';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
export default function Infogather(prop) {
  const [formData, setFormData] = useState({
    about: '',
    experience: [{ jobTitle: '', jobDescription: '' }],
    skills: [''],
    softSkills: [''],
    education: [{ college: '', timeAttended: '' }],
    references: [{ refererName: '', refererDesignation: '', quote: '' }],
    contact: { name: '', phone: '', email: '' },
    image: null,
  });
 
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const location = useLocation();
 

  const handleChange = (e, field, index) => {
    const value = e.target.value;

    if (field === 'experience' || field === 'education') {
      const updatedField = [...formData[field]];
      updatedField[index] = { ...updatedField[index], [e.target.name]: value };
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedField,
      }));
    } else if (field === 'references') {
      const updatedReferences = [...formData.references];
      updatedReferences[index] = { ...updatedReferences[index], [e.target.name]: value };
      setFormData((prevState) => ({
        ...prevState,
        references: updatedReferences,
      }));
    } else if (field === 'contact') {
      setFormData((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [e.target.name]: value,
        },
      }));
    } else if (field === 'image') {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = file;
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      }
    } else if (Array.isArray(formData[field])) {
      const updatedField = [...formData[field]];
      updatedField[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedField,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };
  const queryParams = new URLSearchParams(location.search);
  const [idrec,setidrec]=useState(queryParams.get('id'))
 
  const handleAddField = (field) => {
    setFormData((prevState) => {
      if (field === 'experience') {
        return { ...prevState, experience: [...prevState.experience, { jobTitle: '', jobDescription: '' }] };
      } else if (field === 'skills' || field === 'softSkills') {
        return { ...prevState, [field]: [...prevState[field], ''] };
      } else if (field === 'education') {
        return { ...prevState, education: [...prevState.education, { college: '', timeAttended: '' }] };
      } else if (field === 'references') {
        return { ...prevState, references: [...prevState.references, { refererName: '', refererDesignation: '', quote: '' }] };
      }
      return prevState;
    });
  };

  
  const handleNext = (field) => {
    const errors = [];

    if (field === 'experience') {
      formData[field].forEach((item) => {
        if (!item.jobTitle || !item.jobDescription) {
          errors.push(`${field} is incomplete.`);
        }
      });
    } else if (field === 'contact') {
      if (!formData[field].name || !formData[field].phone || !formData[field].email) {
        errors.push(`${field} is incomplete.`);
      }
    } else if (!formData[field]) {
      errors.push(`${field} cannot be empty.`);
    }
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setresumeState(formData)); 
    console.log('Form data submitted: ', formData);
   
    const queryParams = new URLSearchParams(location.search);
    navigate(`/ResumeEditer?id=${ queryParams.get('id')}`);
  };
  
  useEffect(()=>{
    if (idrec === "about") {
      setCurrentStep(0);
    } else if (idrec === "experience") {
        setCurrentStep(1);
    } else if (idrec === "education") {
        setCurrentStep(2);
    } else if (idrec === "skill") {
        setCurrentStep(4);
    } else if (idrec === "softskill") {
        setCurrentStep(3);
    } else if (idrec === "contact") {
        setCurrentStep(7);
    } else if (idrec === "references") {
        setCurrentStep(6);
    } else {
      
        setCurrentStep(0); 
    }
  
  },[])

 
  const renderFormField = (field, index) => {
    let content = null;

    switch (field) {
      case 'about':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>About You</h3>
            <label style={labelStyle}>Describe Yourself for your resume</label>
            <textarea
              value={formData.about}
              onChange={(e) => handleChange(e, 'about')}
              style={textareaStyle}
              rows="4"
            />
          </div>
        );
        break;

      case 'experience':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Work Experience</h3>
            {formData.experience.map((exp, idx) => (
              <div key={idx}>
                <label style={labelStyle}>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={exp.jobTitle}
                  onChange={(e) => handleChange(e, 'experience', idx)}
                  style={inputStyle}
                />
                <label style={labelStyle}>Job Description</label>
                <textarea
                  name="jobDescription"
                  value={exp.jobDescription}
                  onChange={(e) => handleChange(e, 'experience', idx)}
                  style={textareaStyle}
                  rows="4"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('experience')} style={buttonStyle}>
              Add More Experience
            </button>
          </div>
        );
        break;

      case 'skills':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Skills</h3>
            <label style={labelStyle}>Choose your skills:</label>
            {formData.skills.map((skill, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleChange(e, 'skills', idx)}
                  style={inputStyle}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('skills')} style={buttonStyle}>
              Add More Skills
            </button>
          </div>
        );
        break;

      case 'softSkills':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Soft Skills</h3>
            <label style={labelStyle}>Choose your soft skills:</label>
            {formData.softSkills.map((softSkill, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  value={softSkill}
                  onChange={(e) => handleChange(e, 'softSkills', idx)}
                  style={inputStyle}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('softSkills')} style={buttonStyle}>
              Add More Soft Skills
            </button>
          </div>
        );
        break;

      case 'education':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Education</h3>
            {formData.education.map((edu, idx) => (
              <div key={idx}>
                <label style={labelStyle}>College/University</label>
                <input
                  type="text"
                  name="college"
                  value={edu.college}
                  onChange={(e) => handleChange(e, 'education', idx)}
                  style={inputStyle}
                />
                <label style={labelStyle}>Time Attended</label>
                <input
                  type="text"
                  name="timeAttended"
                  value={edu.timeAttended}
                  onChange={(e) => handleChange(e, 'education', idx)}
                  style={inputStyle}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('education')} style={buttonStyle}>
              Add More Education
            </button>
          </div>
        );
        break;
        case 'contact':
          content = (
            <div style={formSectionStyle}>
              <h3 style={sectionTitleStyle}>Contact Information</h3>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.contact.name}
                onChange={(e) => handleChange(e, 'contact')}
                style={inputStyle}
              />
              <label style={labelStyle}>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.contact.phone}
                onChange={(e) => handleChange(e, 'contact')}
                style={inputStyle}
              />
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.contact.email}
                onChange={(e) => handleChange(e, 'contact')}
                style={inputStyle}
              />
            </div>
          );
          break;
      case 'references':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>References</h3>
            {formData.references.map((ref, idx) => (
              <div key={idx}>
                <label style={labelStyle}>Name of the Referrer</label>
                <input
                  type="text"
                  name="refererName"
                  value={ref.refererName}
                  onChange={(e) => handleChange(e, 'references', idx)}
                  style={inputStyle}
                />
                <label style={labelStyle}>Designation of the Referrer</label>
                <input
                  type="text"
                  name="refererDesignation"
                  value={ref.refererDesignation}
                  onChange={(e) => handleChange(e, 'references', idx)}
                  style={inputStyle}
                />
                <label style={labelStyle}>Enter the Quote</label>
                <textarea
                  name="quote"
                  value={ref.quote}
                  onChange={(e) => handleChange(e, 'references', idx)}
                  style={textareaStyle}
                  rows="4"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('references')} style={buttonStyle}>
              Add More References
            </button>
          </div>
        );
        break;

      case 'image':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Profile Image</h3>
            <label style={labelStyle}>Upload your profile image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, 'image')}
              style={inputStyle}
            />
            {formData.image && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={formData.image}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        );
        break;

      default:
        return null;
    }

    return content;
  };

  
  const formFields = ['about', 'experience', 'skills', 'softSkills', 'education', 'references', 'contact', 'image'];

  
  const isLastStep = currentStep === formFields.length - 1;

  return (
    <div style={containerStyle}>
      <DomHeader />
      <div style={{ width: '100%', background: '#FFFFE0' }}>
        <h2>Please fill in the following fields</h2>
      </div>
     
      <br />
      {errorMessages.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <div style={containerStyle1}>
    
        <div style={{ ...barStyle, width: `${currentStep * 10}%` }} />
        <p style={labelStyle1}>{currentStep * 10}%</p>
        <br />
        <h3>You are almost there ...</h3>
      </div>
      <br />
      <br />
     
      <form onSubmit={handleSubmit} style={formContentStyle}>
        {renderFormField(formFields[currentStep])}
        <div className="form-buttons">
          {currentStep < formFields.length - 1 && idrec !== "about" && (
            <button
              type="button"
              onClick={() => handleNext(formFields[currentStep])}
              style={buttonStyle}
              className="btn btn-primary"
            >
              Next
            </button>
          )}

        {(currentStep === formFields.length - 1 || idrec === "about" || idrec === "experience" || idrec === "skills" || idrec === "softSkills" || idrec === "education" || idrec === "contact" || idrec === "references") && (
          <button type="submit" style={buttonStyle} className="btn btn-success">
            Submit
          </button>
        )}

        </div>

      </form>

       
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}


const containerStyle1 = {
  width: '100%',
  backgroundColor: '#e0e0e0',
  borderRadius: '10px',
  position: 'relative',
  height: '30px',
  marginBottom: '20px',
};

const barStyle = {
  height: '100%',
  backgroundColor: '#76c7c0',
  borderRadius: '10px',
  transition: 'width 0.2s ease', 
};

const labelStyle1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontWeight: 'bold',
};

const buttonStyle1 = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  marginTop: '10px',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px',
};

const formContentStyle = {
  maxWidth: '600px',
  width: '100%',
};

const formSectionStyle = {
  marginBottom: '20px',
};

const sectionTitleStyle = {
  fontSize: '20px',
  marginBottom: '8px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const selectStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  marginTop: '10px',
};
