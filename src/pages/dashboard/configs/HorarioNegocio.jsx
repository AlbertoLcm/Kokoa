import React, { useEffect, useState } from "react";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import LoadingElement from "../../../components/loadings/LoadingElement"



const HorarioNegocio = () => {
    const [cargandoPagina, setCargandoPagina] = useState(true)
    const [esperandoRespuesta, setEsperandoRespuesta] = useState(false)
    const [cambioHorario, setCambioHorario] = useState(false);
    const [negocio, setNegocio] = useState({})
    const [newData, setNewData] = useState({
        Lun1: "",
        Lun2: "",
        Mar1: "",
        Mar2: "",
        Mie1: "",
        Mie2: "",
        Jue1: "",
        Jue2: "",
        Vie1: "",
        Vie2: "",
        Sab1: "",
        Sab2: "",
        Dom1: "",
        Dom2: ""
    });

    const { user } = useAuth();

    const changeCambioHorario = () => {
        setCambioHorario(!cambioHorario)
    }
    const handleChange = (input) => {
        setNewData({
            ...newData,
            [input.target.name]: input.target.value
        })
    }
    const actualizarDatos = (formulario) => {
        formulario.preventDefault() // evitar que se mande el formulario
        setEsperandoRespuesta(true)
        let horarioActualizado= {horario: newData.Lun1+ "-" + newData.Lun2+ "," + newData.Mar1+ "-" + newData.Mar2+ "," + newData.Mie1+ "-" + newData.Mie2+ "," + newData.Jue1+ "-" + newData.Jue2+ "," + newData.Vie1+ "-" + newData.Vie2+ "," + newData.Sab1+ "-" + newData.Sab2+ "," + newData.Dom1+ "-" + newData.Dom2}
        instance.put(`/negocios/${user.id}`, horarioActualizado)
        .then((res) => {
            instance.get(`/negocios/${user.id}`)
            .then((response) => {
                setNegocio(response.data)
                alert("Informacion actualizada con exito")
                console.log(negocio)
                changeCambioHorario()
                setEsperandoRespuesta(false)
            })
            .catch((res) => {
                alert("Todo meco")
            })
        })
        .catch((res) => {
            console.log(res)
            alert("hubo un error al actualizar sus datos")
        })
        
    }

    useEffect (() => {
        instance.get(`/negocios/${user.id}`)
        .then((res) => {
            setNegocio(res.data)
            setCargandoPagina(false)
        })
    })

    if(cargandoPagina){
        return(
            <LoadingElement />
        )
    }

    return(
        <div className="informacionNegocio">
            <section className="titulo">
                <h1>Horario de tu negocio</h1>
            </section>
            <section className="info">
                <h5>Horario del negocio</h5>
                {
                    cambioHorario === false ? (
                        <>
                        <h2>{negocio.horario !== null ? (negocio.horario) : ("Aun no has establecido ningun horario")}</h2>
                        <button onClick={changeCambioHorario} >Cambiar horario</button>
                        </>
                    ) : (
                    <div id="cambiarDato">
                        {
                        esperandoRespuesta ? (
                            <LoadingElement />
                        ) : (
                            <form onSubmit={actualizarDatos} method="PUT" action="/">
                                <h5>Ingrese el nuevo horario</h5>
                                <div className="NegcontHorario">
                                    <h3>Lunes</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Lun1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Lun2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Lun1}
                                            value={newData.Lun2}
                                        />
                                        </div>
                                    </div>
                                    <div>
                                    <h3>Martes</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Mar1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Mar2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Mar1}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <h3>Miercoles</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Mie1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Mie2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Mie1}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <h3>Jueves</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Jue1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Jue2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Jue1}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <h3>Viernes</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Vie1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Vie2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Vie1}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <h3>Sabado</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Sab1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Sab2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Sab1}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <h3>Domigo</h3>
                                    <div className="NegcontHorDia">
                                        <h2 className="NegtextHor">De: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Dom1"
                                            onChange={handleChange}
                                            type="time"
                                        />
                                        </div>
                                        <h2 className="NegtextHor"> a: </h2>
                                        <div className="inputBox">
                                        <input
                                            name="Dom2"
                                            onChange={handleChange}
                                            type="time"
                                            min={newData.Dom1}
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <section id="cambiarDatoBotones">
                                    <button onClick={changeCambioHorario} >Cancelar</button>
                                    <input type="submit" value="Actualizar"/>
                                </section>
                            </form>
                        )
                        }
                    </div>

                    )
                }
            </section>
        </div>
    )
}

export default HorarioNegocio;