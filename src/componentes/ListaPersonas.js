
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { borrarPersona } from "../features/PersonasSlice";
import axios from "axios";

export default function ListaPersonas(){
    const personas = useSelector(state => state.personas.personas);
    const ocupaciones = useSelector(state => state.ocupaciones.ocupaciones);
    const dispatch = useDispatch();
    const [ocSeleccionada, setOcSeleccionada] = useState("");
    const apikey = localStorage.getItem("token");
    const iduser = localStorage.getItem("idUsuario");

    useEffect(() => {

    }, [])

    const borrarPersonaApi = async (persona) => {
        const response = await axios.delete("https://censo.develotion.com/personas.php",
        {
            headers: {
                'Content-Type': 'application/json',
                'apikey': apikey,
                'iduser': iduser
            },
            params: {
                'idCenso': persona.id
            }
        })
        if(response.data.codigo == 200){
            dispatch(borrarPersona(persona.id))
        }
    }

    const handleBorrarPersona = (persona) => {
        borrarPersonaApi(persona);
    }

    const renderedPersonas = personas.map((per) => {

        if(ocSeleccionada == ""){
            return(
                <div key={per.id} className="flex justify-between mx-5 my-1 h-max ">
                    <p>
                        {per.nombre}
                    </p>
                    <button onClick={() => handleBorrarPersona(per)} className="bg-red-300 rounded text-xs p-1">
                        Remove
                    </button>
                </div>
            )
        }

        if(ocSeleccionada != "" && per.ocupacion == ocSeleccionada){
            return(
                <div key={per.id} className="flex justify-between mx-5 my-1  h-max">
                    <p>
                        {per.nombre}
                    </p>
                    <button onClick={() => handleBorrarPersona(per)} className="bg-red-300 rounded text-xs p-1">
                        Remove
                    </button>
                </div>
            )
        }

        
        
    })
    return(
        <section className="rounded col-start-8 col-span-5 bg-gray-100 row-start-3 row-span-3 mx-5 mt-20">
            <h2 className="p-3 text-center" >List of people:</h2>
            <label className="mx-3">Filter</label>
            <select value={ocSeleccionada} onChange={e => setOcSeleccionada(e.target.value)}  className="  bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="">All occupations</option>
                {ocupaciones.map((oc) => {
                    return <option key={oc.id} value={oc.id}>
                        {oc.ocupacion}
                    </option>
                })}
            </select>
            <div className="overflow-y-scroll lg:h-72 md:h-48 sm:h-44 h-32" >
                {renderedPersonas}

            </div>
        </section>
    )
}