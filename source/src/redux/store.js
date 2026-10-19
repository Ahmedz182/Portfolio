// store.js
import rootSlice from './rootSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    root: rootSlice,
    // ... other reducers if any
});

const store = configureStore({
    reducer: rootReducer,
    // ... other configurations
});

export default store;
