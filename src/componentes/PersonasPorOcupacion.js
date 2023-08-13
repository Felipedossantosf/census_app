
import { fetchPersonas, borrarPersona, agregarPersona } from "../features/PersonasSlice";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  
export default function PersonasPorOcupacion(){
    const ocupaciones = useSelector(state => state.ocupaciones.ocupaciones);
    const personas = useSelector(state => state.personas.personas);
    const dispatch = useDispatch();

    const ocCensadas = (pers) => {
        const ocFiltradas = [];
        pers.map((per) => {
            ocFiltradas.push(per.ocupacion);
        })
        const unicas = ocFiltradas.filter((valor, indice) => {
            return ocFiltradas.indexOf(valor) === indice;
        })
        return unicas;
    }

    const nombresOcCensadas = (ocupaciones, idOc) => {
        let aux = [];
        ocupaciones.map((oc) => {
            for(var i = 0; i <= idOc.length; i++){
                if(oc.id === idOc[i]){
                 aux.push(oc.ocupacion);
                }
            }
        })
        return aux;
    }

    const PersonasPorOcupacion = {};

    personas.forEach(persona => {
        const oc = persona.ocupacion;
        PersonasPorOcupacion[oc] = (PersonasPorOcupacion[oc] || 0) + 1;
    })

    const cantPersonasPorOcupacion = Object.values(PersonasPorOcupacion);

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
      

    const misLabels = nombresOcCensadas(ocupaciones, ocCensadas(personas));

    const data = {
        labels:misLabels,
        datasets: [
          {
            label: 'Registered',
            data: cantPersonasPorOcupacion,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return(
        <section className="rounded bg-gray-100 mx-5 col-start-8 col-span-5 row-start-1 row-span-3 h-4/5">
            <h2 className="text-center p-3">Registered users per occupation graphic.</h2>
            <div style={{height: '300px'}} className="flex justify-center">
                <Bar options={options} data={data} />
            </div>
        </section>
    )
}