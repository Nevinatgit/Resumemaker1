// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import resumeEditorReducer from './reducer'; // Import the reducer from the slice

const store = configureStore({
  reducer: {
    resumeEditor: resumeEditorReducer, // Add the reducer to the store
  },
});

export default store;
