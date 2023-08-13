import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import registroReducer from '../features/registroSlice';
import departamentosReducer from '../features/departamentosSlice';
import ocupacionesReducer from "../features/ocupacionesSlice";
import personasReducer from '../features/PersonasSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    registro: registroReducer,
    departamentos: departamentosReducer,
    ocupaciones: ocupacionesReducer,
    personas: personasReducer
})
const store = configureStore({
    reducer: rootReducer,
});

export default store;
 