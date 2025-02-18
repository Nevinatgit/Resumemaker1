import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // To dispatch actions to Redux
import { setresumeState } from './reducer'; // Import the action
import DomHeader from './DomHeader';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function Infogather() {
  const [formData, setFormData] = useState({
    about: '',
    experience: [{ jobTitle: '', jobDescription: '' }],
    skills: '',
    softSkills: '',
    education: [{ college: '', timeAttended: '' }],
    references: { refererName: '', refererDesignation: '', quote: '' },
    contact: { name: '', phone: '', email: '' },
    image: null,  // New property to store the image
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessages, setErrorMessages] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change for different fields
  const handleChange = (e, field, index) => {
    const value = e.target.value;

    if (field === "experience" || field === "education") {
      const updatedField = [...formData[field]];
      updatedField[index] = { ...updatedField[index], [e.target.name]: value };
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedField,
      }));
    } else if (field === "references") {
      setFormData((prevState) => ({
        ...prevState,
        references: {
          ...prevState.references,
          [e.target.name]: value,
        },
      }));
    } else if (field === "contact") {
      setFormData((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [e.target.name]: value,
        },
      }));
    } else if (field === "image") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  // Handle next button click
  const handleNext = (field) => {
    const errors = [];
    
    // Validate required fields
   
      if (field === "experience" || field === "education") {
        formData[field].forEach((item) => {
          if (!item.jobTitle || !item.jobDescription) {
            errors.push(`${field} is incomplete.`);
          }
        });
      } else if (field === "contact" || field === "references") {
        if (!formData[field].name || !formData[field].phone || !formData[field].email) {
          errors.push(`${field} is incomplete.`);
        }
      } else if (!formData[field]) {
        errors.push(`${field} cannot be empty.`);
      }
   
    // Display error messages if any required fields are empty
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setresumeState(formData)); // Save formData in resumeStateX
    console.log("Form data submitted: ", formData);
    navigate("/ResumeEditer");
  };

  // Render specific field content
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
          </div>
        );
        break;

      case 'skills':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Skills</h3>
            <label style={labelStyle}>Choose your skills:</label>
            <select
              value={formData.skills}
              onChange={(e) => handleChange(e, 'skills')}
              style={selectStyle}
            >
              <option value="">Select Skill</option>
              <option value="React">React</option>
              <option value="Java">Java</option>
              <option value="Excel">Excel</option>
              <option value="medical-coding-billing">Medical coding and billing</option>
              <option value="nursing-procedures">Nursing procedures</option>
              <option value="lab-testing-analysis">Lab testing and analysis</option>
              <option value="phlebotomy">Phlebotomy (blood collection)</option>
            </select>
          </div>
        );
        break;

      case 'softSkills':
        content = (
          <div style={formSectionStyle}>
            <h3 style={sectionTitleStyle}>Soft Skills</h3>
            <label style={labelStyle}>Choose your soft skills:</label>
            <select
              value={formData.softSkills}
              onChange={(e) => handleChange(e, 'softSkills')}
              style={selectStyle}
            >
              <option value="">Select Soft Skill</option>
              <option value="Communication">Communication</option>
              <option value="Teamwork">Teamwork</option>
              <option value="Leadership">Leadership</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="Adaptability">Adaptability</option>
            </select>
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
            <label style={labelStyle}>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.contact.phone}
              onChange={(e) => handleChange(e, 'contact')}
              style={inputStyle}
            />
            <label style={labelStyle}>Email</label>
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
            <label style={labelStyle}>Name of the referrer</label>
            <input
              type="text"
              name="refererName"
              value={formData.references.refererName}
              onChange={(e) => handleChange(e, 'references')}
              style={inputStyle}
            />
            <label style={labelStyle}>Designation of the referrer</label>
            <input
              type="text"
              name="refererDesignation"
              value={formData.references.refererDesignation}
              onChange={(e) => handleChange(e, 'references')}
              style={inputStyle}
            />
            <label style={labelStyle}>Enter the quote</label>
            <textarea
              name="quote"
              value={formData.references.quote}
              onChange={(e) => handleChange(e, 'references')}
              style={textareaStyle}
              rows="4"
            />
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

  // Handle next button click


  // Form fields order
  const formFields = ['about', 'experience', 'skills', 'softSkills', 'education', 'references', 'contact', 'image'];

  // Determine if the current section is the last
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
      {/* The progress bar width is incremented by 10% with each increase of the variable */}
      <div style={{ ...barStyle, width: `${currentStep * 10}%` }} />
      <p style={labelStyle1}>{currentStep * 10}%</p>
      <br/>
      <h3>You are almost there ...</h3>
      
    </div>
    <br/>
    <br/>
      <form onSubmit={handleSubmit} style={formContentStyle}>
        {renderFormField(formFields[currentStep])}
        <div className="form-buttons">
        {currentStep < formFields.length - 1 && (
          <button
            type="button"
            onClick={()=>handleNext(formFields[currentStep])}
            style={buttonStyle}
            className="btn btn-primary"
          >
            Next
          </button>
        )}
        {currentStep === formFields.length - 1 && (
          <button type="submit" style={buttonStyle} className="btn btn-success">
            Submit
          </button>
        )}
      </div>
      </form>
      <br/>
      <br/>
      <br/>
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
  transition: 'width 0.2s ease', // Smooth transition for the progress bar
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
  marginTop: '20px',
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

const submitButtonStyle = {
  padding: '12px 24px',
  fontSize: '18px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  marginTop: '20px',
};
