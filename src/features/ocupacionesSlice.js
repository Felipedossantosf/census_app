import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//cargar ocupaciones
export const cargarOcupaciones = createAsyncThunk('ocupaciones/cargarOcupaciones', async () => {
    const API_URL = "https://censo.develotion.com";
    const apikey = localStorage.getItem("token");
    const iduser = localStorage.getItem("idUsuario");

    try{
        const response = await axios.get(API_URL+'/ocupaciones.php',
        {
            headers: {
                'Content-Type' : 'application/json',
                'apikey' : apikey,
                'iduser' : iduser
            }
        })
        const ocupaciones = response.data.ocupaciones;
        return ocupaciones;
    }catch(error){
        throw new Error(error)
    }
})

const initialState = {
    ocupaciones: []
}

export const ocupacionesSlice = createSlice({
    name: 'ocupaciones',
    initialState,
    reducers:{
        guardarOcupaciones: (state, action) => {
            state.ocupaciones = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(cargarOcupaciones.fulfilled, (state, action) => {
            state.ocupaciones = action.payload;
        })
    }
})

export const { guardarOcupaciones } = ocupacionesSlice.actions;

export default ocupacionesSlice.reducer;