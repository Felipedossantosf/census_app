
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export default function PorcentajePersonas(){
    const API_URL = "https://censo.develotion.com";
    const misPersonas = useSelector(state => state.personas.personas);
    const [cantPersonas, setCantPersonas] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);
    const apikey = localStorage.getItem("token");
    const iduser = localStorage.getItem("idUsuario");

    useEffect(() => {
        totalCensados();
        setPorcentaje((misPersonas.length * 100 / cantPersonas).toFixed(3));
    })

    const totalCensados = async () => {
        try{
            const response = await axios.get(API_URL+"/totalCensados.php",
            {
                headers:{
                    'Content-Type' : 'application/json',
                    'apikey': apikey,
                    'iduser': iduser
                }
            })
            if(response.data.codigo == 200){
                setCantPersonas(response.data.total);
            }
        }catch(error){
            console.log(error);
        }
    }



    return(
        <section className="flex flex-col justify-evenly rounded bg-gray-100 col-start-1 col-span-1 row-start-4 row-span-1 my-2 ml-5">
            <p className="text-center mt-2">Registered percentage: </p>
            <p className="text-center">{porcentaje}%</p>
        </section>
    )
}