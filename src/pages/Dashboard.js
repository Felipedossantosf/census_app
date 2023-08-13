import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutUser } from '../features/authSlice';

import AgregarPersona from '../componentes/AgregarPersona';
import ListaPersonas from '../componentes/ListaPersonas';
import CensadosTotales from '../componentes/CensadosTotales';
import PersonasPorDepto from '../componentes/PersonasPorDepto';
import PersonasPorOcupacion from '../componentes/PersonasPorOcupacion';
import MapaPersonas from '../componentes/MapaPersonas';
import PorcentajePersonas from '../componentes/PorcentajePersonas';
import TiempoRestante from '../componentes/TiempoRestante';
import { cargarDepartamentos } from '../features/departamentosSlice';
import {  cargarOcupaciones } from '../features/ocupacionesSlice';
import {  fetchPersonas } from '../features/PersonasSlice';


export default function Dashboard(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const success = useSelector(state => state.auth.success);
    const usuario = localStorage.getItem("usuario");
    
    useEffect(() => {
        if(usuario == null){
            return navigate("/");
        }
        dispatch(fetchPersonas());
        dispatch(cargarOcupaciones());
        dispatch(cargarDepartamentos());
    }, [])

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    }

    return(
        <section className='h-screen'>
            <nav className='flex justify-between mt-9 mb-5 mx-5 p-5 rounded bg-gray-100'>
                <h2 className='text-xl font-bold headDashboard'>{usuario}´s Dashboard</h2>
                <button onClick={handleLogout} className='bg-blue-600 py-2 px-4 text-white rounded-lg'>
                    Logout
                </button>
            </nav>
            
            <div className='grid grid-cols-12 grid-rows-6 h-full '>
                <AgregarPersona />
                <PersonasPorDepto />
                <PersonasPorOcupacion />
                <CensadosTotales />
                <MapaPersonas />
                <ListaPersonas />
                <PorcentajePersonas />
                <TiempoRestante />
            </div>
            
        </section>
    )
}