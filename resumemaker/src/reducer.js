import { createSlice } from '@reduxjs/toolkit';

// Default editor state to avoid repetition
const defaultEditorState = {
  fontSize: "16",
  isBold: true,
  isItalic: false,
  isUnderlined: false,
  alignment: 'left',
  textColor: '#000000',
  highlightColor: '#FFFF00',
  fontFamily: 'Arial',
  bulletList: false,
  image: null, 
};

const initialState = {
  Token: null, 
  selectedAttribute:"about",
  editorState: {
    about: { ...defaultEditorState },
    experience: { ...defaultEditorState },
    skills: { ...defaultEditorState },
    softSkills: { ...defaultEditorState },
    education: { ...defaultEditorState },
    contact: { ...defaultEditorState },
    references: { ...defaultEditorState },
    image: null, // Global image
  },
  resumeStateX1: {
    about: '', // Matches the 'about' field in formData
    experience: [{ jobTitle: '', jobDescription: '' }], // Matches the 'experience' field in formData
    skills: [''], // Change from string to an array like formData
    softSkills: [''], // Change from string to an array like formData
    education: [{ college: '', timeAttended: '' }], // Matches the 'education' field in formData
    contact: { name: '', phone: '', email: '' }, // Matches the 'contact' field in formData
    references: [{ refererName: '', refererDesignation: '', quote: '' }], // Change from object to array like formData
    image: null, // Matches the 'image' field in formData
  },
  history: [],
};

const resumeEditorSlice = createSlice({
  name: 'resumeEditor',
  initialState,
  reducers: {
    // Save the current state and update the editorState
    saveState: (state, action) => {
      state.history.push(state.editorState); // Save the current editorState to history
      state.editorState = { ...action.payload }; // Update editorState with the new state
    },
    
    setresumeState: (state, action) => {
      // Update the resumeStateX with the new payload (formData)
      state.resumeStateX1 = { ...action.payload };
    },
    
    loadState: (state) => {
      const previousState = state.history[state.history.length - 1];
      if (previousState) {
        state.editorState = { ...previousState }; // Load the last saved state
        state.history.pop(); // Remove the last state from history after loading
      }
    },
    
    // Set JWT token
    setToken: (state, action) => {
      state.Token = action.payload;
    },
    
    // Clear JWT token (logout)
    clearToken: (state) => {
      state.Token = "";
    },
    
    // New action to set image in editorState
    setImage: (state, action) => {
      state.editorState.image = action.payload; // Update the image state with the base64 URL
    },

    // Set editorState for individual sections like 'about', 'experience', etc.
    setSectionEditorState: (state, action) => {
      const { section, newEditorState } = action.payload;
      if (state.editorState[section]) {
        state.editorState[section] = { ...newEditorState };
        
      }
    },
  },
});

// Export actions
export const { saveState, loadState, setresumeState, setToken, clearToken, setImage, setSectionEditorState } = resumeEditorSlice.actions;

// Export the reducer
export default resumeEditorSlice.reducer;
