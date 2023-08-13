
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = 'https://censo.develotion.com/login.php';

// Inicio de sesión
export const loginUser = createAsyncThunk('auth/loginUser', async({usuario, password}) => {
    try{
        const response = await axios.post(LOGIN_URL,
             JSON.stringify({usuario, password}),
             {
                headers: { 'Content-Type': 'application/json' }
            }
            );
        const token = response.data.apiKey;
        const idUsuario = response.data.id;
        localStorage.setItem('token', token);
        localStorage.setItem('idUsuario', idUsuario);
        localStorage.setItem('usuario', usuario);
        return { usuario, token};
    }catch(error){
        throw new Error('Usuario o contraseña incorrectos.')
    }
})

const initialState = {
    usuario: '',
    token: '',
    success: false,
    error: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.clear();
            state.usuario = '';
            state.token = '';
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.usuario = action.payload.usuario;
            state.token = action.payload.token;
            state.success = true;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message;
        })
    }
})

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;