import React from "react";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/ConfPerf.css"
import img from "../images/Plagui.jpg"
import {Link} from "react-router-dom";
import routes from "../helpers/routes";
import backimg from "../images/Wall (15).jpg"
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

function ConPerf() {
  const nav = useNavigate();
  const { logout, user } = useAuth();
  const [cont, setCont] = useState(1);

  

  function cambioVis(ver) {
    setCont(ver);
  }

  const [opcio, setOpcio] = useState(false);
  const toggle = () => { setOpcio(!opcio) };

    return (
        <div className="contPerf">
            <Header tipo={'responsive'} user={user[0].nombre} back={true} />
            
            {
                opcio && (
                    <div className="acomodo" id="acomodo">
                        <div className="dropiOpcio">
                            <div onClick={() => nav(-1)} id='toggleSalir'>Volver</div>
                            <div onClick={() => logout()} id='toggleSalir'>Salir</div>
                        </div>
                    </div>
                )
            }
            <div className="contBase">
                <Menu>
                    <button onClick={() => cambioVis(1)}>Información personal</button>
                    <button onClick={() => cambioVis(2)}>Negocios</button>
                    <button onClick={() => cambioVis(3)}>Patrocinios</button>
                    <button onClick={() => cambioVis(4)}>Entretenimiento</button>
                </Menu>
                <div className="navSideBar">
                    <button onClick={() => cambioVis(1)}>Información general</button>
                    <button onClick={() => cambioVis(2)}>Negocios</button>
                    <button onClick={() => cambioVis(3)}>Patrocinios</button>
                    <button onClick={() => cambioVis(4)}>Entretenimiento</button>
                </div>
                <div className="contVis">
                    { 
                        cont === 1 ? ( 
                            <div className="confPerfVisPrin">
                                <div className="confPerfContImgUsBack">
                                    <div className="confPerfImg">
                                        <img src={img} alt="Allí no era" id="imgConfPerfPers"/>
                                    </div>
                                    <img src={backimg} id="confPerfImgBack" />
                                </div>
                                <div className="confPerfInfoGen">
                                    <div id="contInfoGen"><h2>{user[0].nombre}</h2> <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                                    <div id="contInfoGen"><h2>{user[0].telefono}</h2> <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                                    <div id="contInfoGen"><h2>{user[0].email}</h2> <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                                    <div id="contInfoGen"><h2>{user[0].domicilio !== null ? (user[0].domicilio) : ("Sin dirección")}</h2> <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                                    <div id="contInfoGen"><h2>{user[0].fecha_nacimiento !== null ? (user[0].fecha_nacimiento) : ("Sin fecha de nacimiento")}</h2> <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                                </div>
                            </div>
                        ) : cont === 2 ? (
                            <div className="confVar">
                                {/* Si no tiene Negocios */}
                                <div className="contConfVar">
                                    <p>Las cuentas de negocios tienen aceso a un historial de eventos, solicitud de patrocinio e invitaciones a artistas</p>
                                    <Link to={routes.newnegocio} >Crear nuevo negocio </Link>
                                </div>
                                {/* Si tiene negocios */}
                                {/* <div className="contConfVarEx">
                                    <div className="contConfVarNav">
                                        <Link to={routes.newnegocio}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                                        Crear nuevo
                                        </Link>
                                        <div id="ingoNegHov" className="contConfInfoNeg" title="Las cuentas de negocios tienen aceso a un historial de eventos, solicitud de patrocinio e invitaciones a artistas"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><line x1="12" y1="19" x2="12" y2="19.01" /></svg></div>
                                    </div>
                                    <div className="contTarj">
                                        <div className="tarj">
                                            <div className="contImgTarj">
                                                <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                                            </div>
                                            <div className="contInfoTarj">
                                                <h1>Nombre del negocio</h1>
                                                <h2>Info del negcio</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 */}
                            </div>
                        ) : cont === 3 ? (
                            <div className="confVar">
                                {/* Si no tiene Negocios */}
                                {/* <div className="contConfVar">
                                    <p>Las cuentas de patrocinadores tienen acceso a eventos cercanos, solicitudes de patrocinio, busqueda de eventos abiertos a patrocinio y a su contacto</p>
                                    <Link to={routes.newpatrocinador} >Crear nuevo patrocinador </Link>
                                </div> */}
                                {/* Si tiene negocios */}
                                <div className="contConfVarEx">
                                    <div className="contConfVarNav">
                                        <Link to={routes.newpatrocinador}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                                          Crear nuevo
                                        </Link>
                                        <div id="ingoNegHov" className="contConfInfoNeg" title="Las cuentas de patrocinadores tienen acceso a eventos cercanos, solicitudes de patrocinio, busqueda de eventos abiertos a patrocinio y a su contacto"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><line x1="12" y1="19" x2="12" y2="19.01" /></svg></div>
                                    </div>
                                    <div className="contTarj">
                                        <div className="tarj">
                                            <div className="contImgTarj">
                                                <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                                            </div>
                                            <div className="contInfoTarj">
                                                <h1>Nombre del Patrocionio</h1>
                                                <h2>Info del Patrocinio</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        ) : cont === 4 ? (
                            <div className="confVar">
                                 {/* Si no tiene Negocios */}
                                 <div className="contConfVar">
                                    <p>Las cuentas de Entretenimiento tienen acceso a configuracion de tipo de entretenimineto, solicitudes de participacion en eventos y contacto de eventos en busqueda de entretenimiento</p>
                                    <Link to={routes.newnegocio} >Crear nuevo entretenimiento </Link>
                                </div>
                                {/* Si tiene negocios */}
                                {/* <div className="contConfVarEx">
                                    <div className="contConfVarNav">
                                        <Link to={routes.newnegocio}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></svg>
                                        Crear nuevo
                                        </Link>
                                        <div id="ingoNegHov" className="contConfInfoNeg" title="Las cuentas de Entretenimiento tienen acceso a configuracion de tipo de entretenimineto, solicitudes de participacion en eventos y contacto de eventos en busqueda de entretenimiento"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><line x1="12" y1="19" x2="12" y2="19.01" /></svg></div>
                                    </div>
                                    <div className="contTarj">
                                        <div className="tarj">
                                            <div className="contImgTarj">
                                                <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                                            </div>
                                            <div className="contInfoTarj">
                                                <h1>Nombre del Entretenimiento</h1>
                                                <h2>Info del Entretenimiento</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 */}
                            </div>
                        ) : (
                            <div className="entrVis">
                                <h1>¡UPS!, ¡¿Como llegaste hasta aqui?!</h1>
                                <h1>No te preocupes, solo selecciona alguno de los botones</h1>
                                <h1> {"<= "} {"De los de ese lado"} </h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ConPerf;