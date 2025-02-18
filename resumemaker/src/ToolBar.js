import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight, faSave, faUndo, faRedo, faListUl, faImage } from '@fortawesome/free-solid-svg-icons';
import { saveState, loadState } from './reducer';  // Import the Redux actions
import axios from 'axios';
import { setImage } from './reducer'

const ResumeEditorToolbar = () => {
  const dispatch = useDispatch();

  // Get the current editorState and history from Redux store
  const { editorState, history,resumeStateX,Token } = useSelector(state => state.resumeEditor);
  console.log(resumeStateX)
  // Save the current state to history and set it as the new state
  const saveCurrentState = async () => {
    dispatch(saveState(editorState)); 
    try {
      let token=Token

      const response = await axios.post(
        'http://localhost:5000/api/resumeRoutes/saveResume',
        { resumeState: resumeStateX },  // JSON payload
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Attach token
          },
        }
      );
      // Handle the response, e.g., log success or update the state
      console.log('Success:', response.data);
    
      // You can perform additional actions based on the successful response
      // For example, update some state, show a success message, etc.
    
    } catch (error) {
      // Handle errors that might occur during the request
      console.error('Error during the API request:', error);
    

    }
    
  
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      dispatch(loadState(previousState));  // Load the previous state from history
    }
  };

  const redo = () => {
    // Implement redo functionality if necessary (you can store a redo history stack)
  };

  const handleStateChange = (newState) => {
    // Merge the existing state with the updated property and dispatch to Redux
    dispatch(saveState({ ...editorState, ...newState }));
  };

  const handleBoldToggle = () => handleStateChange({ isBold: !editorState.isBold });
  const handleItalicToggle = () => handleStateChange({ isItalic: !editorState.isItalic });
  const handleUnderlineToggle = () => handleStateChange({ isUnderlined: !editorState.isUnderlined });
  const handleFontSizeChange = (e) => handleStateChange({ fontSize: e.target.value });
  const handleAlignmentChange = (align) => handleStateChange({ alignment: align });
  const handleTextColorChange = (e) => handleStateChange({ textColor: e.target.value });
  const handleHighlightColorChange = (e) => handleStateChange({ highlightColor: e.target.value });
  const handleFontFamilyChange = (e) => handleStateChange({ fontFamily: e.target.value });
  const toggleBulletList = () => handleStateChange({ bulletList: !editorState.bulletList });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Dispatch the action to set the image URL in Redux state
        dispatch(setImage(reader.result)); 
      };
      reader.readAsDataURL(file);
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

  return (
    <div style={styles.toolbar}>
    
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
      <div style={styles.buttonGroup}>
        <label style={styles.label}>Highlight Color</label>
        <input
          type="color"
          value={editorState.highlightColor}
          onChange={handleHighlightColorChange}
          style={styles.colorInput}
        />
      </div>

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
        <input type="file" onChange={handleImageUpload} style={styles.fileInput} />
        {editorState.image && <img src={editorState.image} alt="Uploaded" style={styles.imagePreview} />}
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
