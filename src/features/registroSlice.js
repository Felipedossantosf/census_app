
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginUser } from "./authSlice";

const REGISTRO_URL = "https://censo.develotion.com/usuarios.php";

// registro de usuario
export const registroUser = createAsyncThunk('registro/registroUser', async({usuario, password}) => {
    try{
        const response = await axios.post(REGISTRO_URL,
            JSON.stringify({usuario, password}),
            {
                headers: {'Content-Type': 'application/json'}
            })
        const tokenRegistro = response.data.apiKey;
        localStorage.setItem('tokenRegistro', tokenRegistro);
        loginUser({usuario, password});
        return {usuario, tokenRegistro}
        }catch(error){
            throw new Error("Ya existe un usuario con ese nombre");
        }
})

const initialState = {
    usuario: '',
    tokenRegistro: '',
    success: false,
    error: null
}

export const registroSlice = createSlice({
    name:'registro',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem('tokenRegistro');
            state.usuario = '';
            state.tokenRegistro = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registroUser.fulfilled, (state, action) => {
            state.usuario = action.payload.usuario;
            state.tokenRegistro = action.payload.tokenRegistro;
            state.success=true;
            state.error = null;
        })
        .addCase(registroUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export const { logoutUser } = registroSlice.actions;
export default registroSlice.reducer;