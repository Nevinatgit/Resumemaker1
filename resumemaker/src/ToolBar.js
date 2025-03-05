import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faSave, faUndo, faRedo, faListUl, faImage } from '@fortawesome/free-solid-svg-icons';
import { saveState, loadState,setSectionEditorState } from './reducer';  // Import the Redux actions
import axios from 'axios';
import { setImage } from './reducer'
import { jsPDF } from "jspdf";

const ResumeEditorToolbar = (prop) => {
  const dispatch = useDispatch();
  const { editorState, history,resumeStateX1 } = useSelector(state => state.resumeEditor);
  const Token = useSelector(state => state.resumeEditor.Token);
  //console.log(resumeStateX1)
  //console.log(editorState)

  const saveCurrentState = async () => {
    console.log("logger")
    handleImageUpload()
    dispatch(saveState(editorState)); 
    try {
      let token=Token
      console.log(token,"AAAAAAAAAAAAAAAA")
      const response = await axios.post(
        'http://localhost:5000/api/resumeRoutes/saveResume',
        { resumeState: resumeStateX1,resumetemplate:prop.id }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Attach token
          },
        }
      );
     
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error during the API request:', error);
    }
    
  
  };
 
  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      dispatch(loadState(previousState));  
    }
  };

  const redo = () => {
   
  };
  const [selectedAttribute, setSelectedAttribute] = useState('about');
  const handleStateChange = (updates) => {
   
    dispatch(setSectionEditorState({
      section:selectedAttribute ,
      newEditorState: {
        ...editorState[selectedAttribute],  
        ...updates,     
      }
    }));
   
  };

  const handleBoldToggle = () => handleStateChange({ isBold: !editorState[selectedAttribute].isBold });
  const handleItalicToggle = () => handleStateChange({ isItalic: !editorState[selectedAttribute].isItalic });
  const handleUnderlineToggle = () => handleStateChange({ isUnderlined: !editorState[selectedAttribute].isUnderlined });
  const handleFontSizeChange = (e) => handleStateChange({ fontSize: e.target.value });
  const handleAlignmentChange = (align) => handleStateChange({ alignment: align });
  const handleTextColorChange = (e) => handleStateChange({ textColor: e.target.value });
  const handleHighlightColorChange = (e) => handleStateChange({ highlightColor: e.target.value });
  const handleFontFamilyChange = (e) => handleStateChange({ fontFamily: e.target.value });
  const toggleBulletList = () => handleStateChange({ bulletList: !editorState.bulletList });
  
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
      const handleImageChange = (e) => {
        console.log(resumeStateX1.image)
        setSelectedImage(resumeStateX1.image);
      };
    const handleImageUpload = async (e) => {
       await handleImageChange()
        if (!selectedImage) {
          alert('Please select an image to upload');
          return;
        }
        console.log(Token,"dfgdfgdfgdfg")
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('Token',Token)
        formData.append('Id',5)
        try {
          const response = await axios.post('http://localhost:5000/api/resumeRoutes/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          setImageUrl(response.data.imageUrl); 
         
          alert('Image uploaded and saved to MongoDB!');
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
  
  
  
  
  const clearFormatting = () => {
    handleStateChange({
      isBold: false,
      isItalic: false,
      isUnderlined: false,
      fontSize: 16,
      textColor: '#000000',
      highlightColor: '#FFFF00',
      fontFamily: 'Arial',
    });
  };
  const fields = [
    'about',
    'experience',
    'skills',
    'softSkills',
    'education',
    'contact',
    'references',
    'image'
  ];

 
  const handleSelect = (e) => {
    setSelectedAttribute(e.target.value);
    
   
    
  };
  const handlePrint = () => {
    const content = document.getElementById("Resume");
  
    if (content) {
     
      const wrapper = document.createElement('div');
      wrapper.style.border = '2px solid black';  
      wrapper.style.display = 'inline-block';  // Ensure wrapper fits content width
      wrapper.style.margin = '0';
      
      // Get the exact width and height of the content
      const contentRect = content.getBoundingClientRect();
      wrapper.style.width = `${contentRect.width}px`;  // Adjust width to match content
      wrapper.style.height = `${contentRect.height}px`; // Adjust height to match content
  
      // Clone the content and append it to the wrapper
      wrapper.appendChild(content.cloneNode(true));
  
      // Temporarily attach the wrapper to the body to ensure html2canvas captures it
      document.body.appendChild(wrapper);
  
      // Create the PDF document
      const doc = new jsPDF();
  
      // Set the scale factor to fit the content within the page dimensions
      const scale = Math.min(
        .25,  // Scale to fit within page width (595px = A4 width)
       0.22  // Scale to fit within page height (842px = A4 height)
      );
  
      doc.html(wrapper, {
        callback: (doc) => {
          doc.save("Resume.pdf");
        },
        x: 0,  // Starting position
        y: 0,
        html2canvas: {
          scale: scale,  // Scale the content proportionally
          useCORS: true, // Enable cross-origin resource sharing for external resources
        },
      });
  
      // Remove the temporary wrapper after printing
      document.body.removeChild(wrapper);
    } else {
      console.log("No content to print.");
    }
  };
  
  
  
  
  return (
    <div style={styles.toolbar}>
        <div className="container mt-5">
      {/* Bootstrap Dropdown for selecting an attribute */}
      <div className="dropdown">
      
        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Select an attribute
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {/* Loop over the fields array to create dropdown items */}
          {fields.map((field) => (
            <li key={field}>
              <button className="dropdown-item" type="button" onClick={() => setSelectedAttribute(field)}>
                {field}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display the selected attribute */}
      <div className="mt-4">
        <h5>Selected Attribute: {selectedAttribute}</h5>
        {/* Show a placeholder or value related to the selected attribute */}
        {selectedAttribute && <p>This is where the data for {selectedAttribute} will go.</p>}
      </div>
    </div>
      <div className='mt-5' style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleBoldToggle}>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button style={styles.button} onClick={handleItalicToggle}>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button style={styles.button} onClick={handleUnderlineToggle}>
          <FontAwesomeIcon icon={faUnderline} />
        </button>
      </div>

    
      <div style={styles.buttonGroup}>
        <label style={styles.label}>Font Size</label>
        <input
          type="number"
          value={editorState.fontSize}
          min="8"
          max="72"
          onChange={handleFontSizeChange}
          style={styles.fontSizeInput}
        />
      </div>

      {/* Font Family */}
      <div style={styles.buttonGroup}>
        <label style={styles.label}>Font Family</label>
        <select value={editorState.fontFamily} onChange={handleFontFamilyChange} style={styles.fontFamilySelect}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Alignment */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => handleAlignmentChange('left')}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button style={styles.button} onClick={() => handleAlignmentChange('center')}>
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button style={styles.button} onClick={() => handleAlignmentChange('right')}>
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
      </div>

      {/* Text and Highlight Color */}
      <div style={styles.buttonGroup}>
        <label style={styles.label}>Text Color</label>
        <input
          type="color"
          value={editorState.textColor}
          onChange={handleTextColorChange}
          style={styles.colorInput}
        />
      </div>
      {/*<div style={styles.buttonGroup}>
        <label style={styles.label}>Highlight Color</label>
        <input
          type="color"
          value={editorState.highlightColor}
          onChange={handleHighlightColorChange}
          style={styles.colorInput}
        />
      </div>*/}

      {/* Undo and Redo */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={undo}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button style={styles.button} onClick={redo}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>

      {/* Bullet List and Image Upload */}
      <div className="d-flex flex-column justify-content--center" style={styles.buttonGroup}>
        <button style={styles.button} onClick={toggleBulletList}>
          <FontAwesomeIcon icon={faListUl} />
        </button>
       {/* <input type="file" onChange={handleImageUpload} style={styles.fileInput} />
        {editorState.image && <img src={editorState.image} alt="Uploaded" style={styles.imagePreview} />}*/}
      </div>

      {/* Clear Formatting */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={clearFormatting}>
          Clear Formatting
        </button>
      </div>

      {/* Save Button */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={saveCurrentState}>
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
      <button className='btn btn-primary' onClick={handlePrint}>Print resume</button>
    </div>
  );
};

const styles = {
  toolbar: {
    width: '300px',
    height: '100%',
    backgroundColor: '#2c3e50',
    padding: '20px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRight: '2px solid #34495e',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#34495e',
    border: 'none',
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  label: {
    color: 'white',
    marginBottom: '5px',
  },
  fontSizeInput: {
    width: '50px',
    padding: '5px',
    marginTop: '5px',
    borderRadius: '5px',
    border: 'none',
    textAlign: 'center',
  },
  fontFamilySelect: {
    padding: '5px',
    marginTop: '5px',
    borderRadius: '5px',
    border: 'none',
    textAlign: 'center',
  },
  colorInput: {
    marginTop: '5px',
    border: 'none',
    width: '40px',
    height: '30px',
    borderRadius: '5px',
  },
  fileInput: {
    marginTop: '10px',
    cursor: 'pointer',
  },
  imagePreview: {
    marginTop: '10px',
    maxWidth: '100px',
    maxHeight: '100px',
  },
};

export default ResumeEditorToolbar;
