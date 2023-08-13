
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export default function CensadosTotales(){
    const personas = useSelector(state => state.personas.personas);
    const [censados, setCensados] = useState(0);

    useEffect(() => {
        setCensados(personas.length)
    })

    return(
        <section className="flex flex-col justify-evenly rounded bg-gray-100 mx-5 my-2  w-3/12 col-start-2 col-span-7 row-start-4 row-span-1">
            <p className="text-center">Total registered: </p>
            <p className="text-center text-6xl">{censados}</p>
        </section>
    )
}