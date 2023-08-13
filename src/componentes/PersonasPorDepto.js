import { fetchPersonas, borrarPersona, agregarPersona } from "../features/PersonasSlice";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






export default function PersonasPorDepto(){
    const deptos = useSelector(state => state.departamentos.departamentos)
    const personas = useSelector(state => state.personas.personas)
    const dispatch = useDispatch();

    const deptosCensados = (pers) => {
        const deptosFiltrados = [];
        pers.map((per) => {
            deptosFiltrados.push(per.departamento);
        })
        const unicos = deptosFiltrados.filter((valor, indice) => {
            return deptosFiltrados.indexOf(valor) === indice;
        })
        return unicos;
    }

    const nombresDeptosCensados = (deptos, idDeptos) => {
        let aux = [];
        deptos.map((depto) => {
            for(var i=0 ;i <=idDeptos.length; i++){
                if(depto.id === idDeptos[i]){
                    aux.push(depto.nombre);
                }
            }
        })
        return aux;
    }

    const PersonasPorDepto = {};

    personas.forEach(persona => {
        const idDepto = persona.departamento;
        PersonasPorDepto[idDepto] = (PersonasPorDepto[idDepto] || 0) + 1;
    });
    
    const cantPersonasPorDepto = Object.values(PersonasPorDepto)

    useEffect(() => {
        dispatch(fetchPersonas())
    }, [borrarPersona, agregarPersona])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
          },
        },
      };
      

    const misLabels = nombresDeptosCensados(deptos, deptosCensados(personas));

    const data = {
        labels:misLabels,
        datasets: [
          {
            label: 'Registered',
            data: cantPersonasPorDepto,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return(
        <section className="rounded bg-gray-100 col-start-4 col-end-8 row-start-1 row-span-3 h-4/5">
            <h2 className="text-center p-3">Registered users per department graphic</h2>
            <div style={{height: '300px'}} className="flex justify-center">
            <Bar options={options} data={data} />
            </div>
        </section>
    )
}