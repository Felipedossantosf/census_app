
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import {fetchPersonas} from "../features/PersonasSlice";
import { useEffect, useState } from "react";


export default function AgregarPersona(){
    const API_URL = "https://censo.develotion.com";
    const dispatch = useDispatch();
    const apikey = localStorage.getItem("token");
    const iduser = localStorage.getItem("idUsuario");
    const [ciudades, setCiudades] = useState([]);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
    const [deptoSeleccionado, setDeptoSeleccionado] = useState("");
    const [ocupacionSeleccionada, setOcupacionSeleccionada] = useState("");
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [success, setSuccess] = useState(false);
    const deptos = useSelector(state => state.departamentos.departamentos);
    const ocupaciones = useSelector(state => state.ocupaciones.ocupaciones);


    

    const agregarPersonaApi = async (unNombre, unDepto, unaCiudad, fchNac, unaOcupacion) => {
        try{
            const response = await axios.post(API_URL+"/personas.php",
            {   
                'idUsuario': iduser,
                'nombre': unNombre,
                'departamento': unDepto,
                'ciudad': unaCiudad,
                'fechaNacimiento': fchNac,
                'ocupacion': unaOcupacion
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey' : apikey,
                    'iduser' : iduser
                }
            })
            if(response.data.codigo == "200"){
                setSuccess(true);
            }
            console.log(success)
        }catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        dispatch(fetchPersonas());
    }, [agregarPersonaApi])

    const fetchCiudades = async (unDepto) => {
        const response = await axios.get(API_URL+"/ciudades.php",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey' : apikey,
                    'iduser' : iduser
                },
                params: {
                    'idDepartamento' : unDepto
                }
            }
        )
        const ciudades = response.data.ciudades;
        setCiudades(ciudades);
    }

    const handleChangeDepto = (e) => {
        console.log(e.target.value)
        fetchCiudades(e.target.value)
        setDeptoSeleccionado(e.target.value)
        setCiudadSeleccionada("");

        
    }
  
    const handleAgregarPersona = async () => {
        await agregarPersonaApi(nombre, deptoSeleccionado, ciudadSeleccionada, fecha, ocupacionSeleccionada)

        setNombre("");
        setDeptoSeleccionado("");
        setCiudadSeleccionada("");
        setFecha("");
        setOcupacionSeleccionada("");
        
    }
    
    return(
        <section className='rounded flex flex-col mx-5 items-center justify-evenly col-start-1 col-end-4 row-start-1 row-span-3 bg-gray-100'>
            <h2 className="text-xl font-semibold p-3">Register a person:</h2>
            <label className="block w-2/3  mb-2">
                Name
                <input
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="shadow italic appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                />
            </label>
            <select value={deptoSeleccionado} onChange={handleChangeDepto} className="m-2 w-2/3 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select Department</option>
                {deptos.map((depto) => {
                    return <option key={depto.id} value={depto.id}>
                        {depto.nombre}
                    </option>
                })}
            </select>
            <select value={ciudadSeleccionada} onChange={(e) => setCiudadSeleccionada(e.target.value)} className="w-2/3 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select city</option>
                {ciudades.map((c) => {
                    return <option key={c.id} value={c.value}>
                        {c.nombre}
                    </option>
                })}
            </select>
            <label className="w-2/3 m-2">
                Birth Date
                <input 
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  type="date"
                  className="block w-full text-center py-2 px-3 bg-gray-200 border rounded leading-tight"
                />
            </label>
            <select value={ocupacionSeleccionada} onChange={(e) => setOcupacionSeleccionada(e.target.value)} className="m-2 w-2/3 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select occupation</option>
                {ocupaciones.map((oc) => {
                    return <option key={oc.id} value={oc.id}>
                        {oc.ocupacion}
                    </option>
                })}
            </select>
            {success && <p style={{'color':'green'}}>Person successfully registered</p>}
            <button 
              disabled={!nombre || !deptoSeleccionado || !ciudadSeleccionada || !fecha || !ocupacionSeleccionada}
              onClick={handleAgregarPersona}
              className="disabled:bg-gray-400  m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Register Person
            </button>
        </section>
    )
}
