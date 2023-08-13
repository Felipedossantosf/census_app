import { fetchPersonas, borrarPersona, agregarPersona } from "../features/PersonasSlice";

import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default function MapaPersonas(){
    const deptos = useSelector(state => state.departamentos.departamentos);
    const personas = useSelector(state => state.personas.personas);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPersonas())
    }, [borrarPersona, agregarPersona])

    const perFiltro = (depto, personas) => {
        const perFiltradas = [];
        personas.map((per) => {
            if(per.departamento === depto.id){
                perFiltradas.push(per);
            }
        })
        return perFiltradas.length;
    }

    return(
        <section className="flex flex-col justify-center rounded col-start-4 col-end-8 row-start-3 row-span-3 gap-y-2 bg-gray-100 mt-20">
            <p className="text-center p-3">Registered users per department map</p>   
            <div>
            <MapContainer center={[-32.80, -56.09]} zoom={6} scrollWheelZoom={false} style={{height: '300px', width: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {deptos.map((depto) => {
                    return(
                        <Marker position={[depto.latitud, depto.longitud]}>
                            <Popup>
                                {depto.nombre} <br /> {perFiltro(depto, personas)} registered.
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
            </div>
        </section>
    )
}