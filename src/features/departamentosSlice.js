import { createSlice, createAsyncThunk, isAllOf } from "@reduxjs/toolkit";
import axios from "axios";

//cargar departamentos
export const cargarDepartamentos = createAsyncThunk('departamentos/cargarDepartamentos', async () => {
    const API_URL = "https://censo.develotion.com";
    const apikey = localStorage.getItem("token");
    const iduser = localStorage.getItem("idUsuario");
    try{
        const response = await axios.get(API_URL+'/departamentos.php',
        {
            headers: {
                    'Content-Type' : 'application/json',
                    'apikey' : apikey,
                    'iduser' : iduser
                }
        })
        const deptos = response.data.departamentos;
        return deptos;
    }catch(error){
        throw new Error(error);
    }
})

const initialState = {
    departamentos: []
}

export const departamentosSlice = createSlice({
    name:'departamentos',
    initialState,
    reducers:{
        guardarDepartamentos: (state, action) => {
            state.departamentos = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(cargarDepartamentos.fulfilled, (state, action) => {
            state.departamentos = action.payload;
        })
    }
})

export const { guardarDepartamentos } = departamentosSlice.actions;

export default departamentosSlice.reducer;