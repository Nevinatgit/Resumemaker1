// src/redux/actions.js

export const SAVE_STATE = 'SAVE_STATE';
export const LOAD_STATE = 'LOAD_STATE';

// Action to save the current state
export const saveState = (newState) => ({
  type: SAVE_STATE,
  payload: newState,
});

// Action to load a state (from history)
export const loadState = () => ({
  type: LOAD_STATE,
});
