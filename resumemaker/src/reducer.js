import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Token: "", // Store JWT token
  editorState: {
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
  },
  resumeStateX: {
    about: "",
    Experience: ["", ""],
    skills: ["", ""],
    language: "",
    hobbies: "",
    references: "",
    education: "",
    
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
      state.resumeStateX = { ...action.payload };
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
  },
});

// Export actions
export const { saveState, loadState, setresumeState, setToken, clearToken, setImage } = resumeEditorSlice.actions;

// Export the reducer
export default resumeEditorSlice.reducer;
