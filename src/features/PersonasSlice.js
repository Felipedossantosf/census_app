
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch personas
export const fetchPersonas = createAsyncThunk('personas/fetchPersonas', async () => {
    const API_URL = "https://censo.develotion.com";
    const apikey = localStorage.getItem("token");
    const iduser = localStorage.getItem("idUsuario");
    try{
        const response = await axios.get(API_URL+"/personas.php",
        {
            headers:{
                'Content-Type': 'application/json',
                'apikey': apikey,
                'iduser': iduser
            },
            params:{
                'idUsuario': iduser
            }
        })
        const personas = response.data.personas;
        return personas;
    }catch(error){
        throw new Error("Error obteniendo personas")
    }
    
    // dispatch(guardarPersonas(personas));
})

const initialState = {
    personas: [],
}

export const personasSlice = createSlice({
    name: "personas",
    initialState,
    reducers:{
        guardarPersonas: (state, action) => {
            state.personas = action.payload
        },
        agregarPersona: (state, action) => {
            state.personas.push = action.payload;
        },
        borrarPersona: (state, action) => {
            const updated = state.personas.filter((per) => {
                return per.id !== action.payload;
            });
            state.personas = updated;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPersonas.fulfilled, (state, action) => {
            state.personas = action.payload
        })
    }
})

export const { guardarPersonas, borrarPersona, agregarPersona } = personasSlice.actions;

export default personasSlice.reducer;