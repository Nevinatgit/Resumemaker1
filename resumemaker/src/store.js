// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage in the browser)
import resumeEditorReducer from './reducer'; // Import the reducer from the slice

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage,     // Specify the storage method (localStorage)
};

// Wrap the resumeEditor reducer with persistReducer
const persistedResumeEditorReducer = persistReducer(persistConfig, resumeEditorReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: {
    resumeEditor: persistedResumeEditorReducer, // Add the persisted reducer
  },
});

// Create a persistor object which will be used to manage the persistence
const persistor = persistStore(store);

export { store, persistor };
