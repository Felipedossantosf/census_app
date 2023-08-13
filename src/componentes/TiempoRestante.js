
export default function TiempoRestante(){
    const fchFinal = new Date("2023-08-31")
    const diferencia = fchFinal.getTime() - (new Date()).getTime();

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const hours = Math.floor(minutos / 60);
    const dias = Math.floor(hours / 24);

    return(
        <section className="rounded col-start-1 col-end-4 mx-5 bg-gray-100">
            <p className="text-center p-3">Remaining time of census</p>
            <p className="text-center"><span className="text-7xl">{dias}</span> days</p>
        </section>
    )
}