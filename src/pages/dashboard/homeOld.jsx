import ListarComentarios from "../../components/social/ListarComentarios";

<>
  <Header tipo={"responsive"} perfil={user.nombre} back={false} name={false} />

  <Modal
    estado={showModal1}
    cambiarEstado={setShowModal1}
    titulo="Cambiar nombre">
    <div className="modalConfPerfil">
      <p className="titulo">Nombre actual: {rol.nombre} </p>
      <section className="modalNombre">
        <div>
          <p>Nombre</p>
          <input type="text" id="nombre" name="nombre" onChange={handleChange} />
        </div>
      </section>
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <Modal
    estado={showModal2}
    cambiarEstado={setShowModal2}
    titulo="Cambiar telefono de contacto"
  >
    <div className="modalConfPerfil">
      <p className="titulo">Anterior telefono de contacto: {rol.numero} </p>
      <p>Nuevo telefono</p>
      <input type="text" name="numero" onChange={handleChange} />
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <Modal
    estado={showModal3}
    cambiarEstado={setShowModal3}
    titulo="Cambiar correo"
  >
    <div className="modalConfPerfil">
      <p className="titulo">Anterior correo {rol.email}</p>
      <p>Nuevo correo</p><input type="text" name="email" onChange={handleChange} />
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <Modal
    estado={showModal4}
    cambiarEstado={setShowModal4}
    titulo="Cambiar domicilio"
  >
    <div className="modalConfPerfil">
      <p className="titulo">Anterior domicilio {rol.domicilio}</p>
      <p>Nuevo domicilio</p>
      <Autocomplete>
        <div className="inputBox">
          <input
            id="ubicacion"
            name="direccion"
            type="text"
            ref={originRef}
            required
          />
        </div>
      </Autocomplete>
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <Modal
    estado={showModal5}
    cambiarEstado={setShowModal5}
    titulo="Cambiar descripcion"
  >
    <div className="modalConfPerfil">
      <p className="titulo">Anterior descripcion {rol.descripcion}</p>
      <p>Nueva descripcion</p><textarea
        cols="87"
        rows="3"
        maxlength="150"
        placeholder="Añada una descripcion de la forma y tipo de patrocinio que proporciona"
        onChange={handleChange}
        name="descripcion"
      />
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <Modal
    estado={showModal6}
    cambiarEstado={setShowModal6}
    titulo="Cambiar horario"
  >
    <div className="modalConfPerfil">
      <p className="titulo">Anterior horario <span> <br /> {parsHor[0]}</span> -- <span>{parsHor[1]}</span> <br /> <span>{parsHor[2]}</span> -- <span>{parsHor[3]}</span> <br /> <span>{parsHor[4]}</span> -- <span>{parsHor[5]}</span> <br /> <span>{parsHor[6]}</span></p>
      <p>Nuevo fecha</p>
      <h2>Horario</h2>
      <div className="NegcontHorario">
        <div>
          <h2>Lunes</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Lun1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Lun2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Martes</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Mar1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Mar2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Miercoles</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Mie1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Mie2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Jueves</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Jue1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Jue2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Viernes</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Vie1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Vie2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Sabado</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Sab1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Sab2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Domigo</h2>
          <div className="NegcontHorDia">
            <h2 className="NegtextHor">De: </h2>
            <div className="inputBox">
              <input
                name="Dom1"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
            <h2 className="NegtextHor"> a: </h2>
            <div className="inputBox">
              <input
                name="Dom2"
                onChange={handleChange}
                type="time"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <Modal
    estado={showModal7}
    cambiarEstado={setShowModal7}
    titulo="Cambiar sitio web"
  >
    <div className="modalConfPerfil">
      <p className="titulo">Anterior sitio web <a href={`https://${rol.sitio_web}`} target="_blank">{rol.sitio_web}</a> </p>
      <p>Nuevo sitio web</p><input type="text" name="sitio_web" onChange={handleChange} />
      <button onClick={() => handleUpdate()}>Guardar</button>
    </div>
  </Modal>

  <div id="ContGeneralNegocios">
    <section className="contFeedNegocios">

      <section id="contGeneralBtn">
        <div className="contBtnFeedNegocios">
          <section className="titulo">
            <h1>{user.nombre_cargo}</h1>
          </section>
          <div className="btnsFeedNegocios">

            {
              user.rol === "negocios" && (
                <>
                  <button className="btnFeedNegocios" onClick={() => setVisua(1)}>Inicio</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(2)}>Tus eventos</button>
                  <button className="btnFeedNegocios" onClick={() => setVisua(3)}>Estadisticas</button>
                </>
              )
            }

            <button className="btnFeedNegocios" onClick={() => setVisua(4)}>Tu información</button>
            <button className="btnFeedNegocios" onClick={() => setVisua(5)}>Tu perfil</button>
            <button className="btnFeedNegocios" onClick={() => setVisua(6)}>Mensajeria</button>
            <button className="btnFeedNegocios" onClick={() => setVisua(7)}>Tu ubicación</button>
          </div>
        </div>
      </section>

      <section id="contenedorGeneralFeedNegocios">

        <div className="contenidoFeedNegocios">
          {
            visua === 2 ? (
              <>
                <div id="ContEventosNegocioFeed">

                  <Modal
                    estado={showModalRegistrar}
                    cambiarEstado={setShowModalRegistrar}
                    titulo="Registrar evento"
                  >
                    <RegistroEvento negocio={true} />
                  </Modal>

                  <button className="btnLink2" onClick={() => setShowModalRegistrar(!showModalRegistrar)}>Crear un nuevo evento</button>

                  <section id="ContEventosNegocio">
                    <ListaEventosFeed id={user.id} solicito="negocio" />
                  </section>
                </div>
              </>
            ) : visua === 1 ? (
              <>
                <ListarComentarios id_negocio={user.id} />
              </>
            ) : visua === 3 ? (
              <>
                <h3>Estadisticas</h3>
                <h3>
                  Aquí puedes ver tus estadisticas de eventos pasados
                </h3>
              </>
            ) : visua === 4 ? (
              <>
                {/* Datos de roles */}
                <h1>Nombre</h1>
                <div id="contInfoGen" ><h2>{rol.nombre} </h2> <button onClick={() => setShowModal1(!showModal1)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                <h1>Numero</h1>
                <div id="contInfoGen"><h2>{rol.numero !== null ? (rol.numero) : ("Sin numero de contacto")}</h2> <button onClick={() => setShowModal2(!showModal2)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                <h1>Email</h1>
                <div id="contInfoGen"><h2>{rol.email !== null ? (rol.email) : ("Sin correo de contacto")}</h2> <button onClick={() => setShowModal3(!showModal3)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                <h1>Dirección</h1>
                <div id="contInfoGen"><h2>{rol.direccion}</h2> <button onClick={() => setShowModal4(!showModal4)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                <h1>Descripción</h1>
                <div id="contInfoGen"><h2>{rol.descripcion !== null ? (rol.descripcion) : ("Sin descripcion")}</h2> <button onClick={() => setShowModal5(!showModal5)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                <h1>Sitio Web</h1>
                <div id="contInfoGen"><h2>{rol.sitio_web !== null ? (<a href={`https://${rol.sitio_web}`} target="_blank">{rol.sitio_web}</a>) : ("Sin sitio web")}</h2> <button onClick={() => setShowModal7(!showModal7)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>
                {rol.rol === "negocios" && (<h1>Horario</h1>)}
                {rol.rol === "negocios" && (<div id="contInfoGen"><h2> <span>{parsHor[0]}</span> <br /> <span>{parsHor[1]}</span> <br /> <span>{parsHor[2]}</span> <br /> <span>{parsHor[3]}</span> <br /> <span>{parsHor[4]}</span> <br /> <span>{parsHor[5]}</span> <br /> <span>{parsHor[6]}</span> </h2> <button onClick={() => setShowModal6(!showModal6)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /><path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /><line x1="16" y1="5" x2="19" y2="8" /></svg></button></div>)}
              </>
            ) : visua === 5 ? (
              <>
                <Modal
                  estado={showCambiarFoto}
                  cambiarEstado={setShowCambiarFoto}
                  titulo="Actualizar foto de perfil"
                >
                  <div className="modalConfPerfil">

                    <section className="contInputFile">
                      <div className="inputFile">
                        <svg xmlns="http:/  /www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="12" cy="12" r="9" />
                          <line x1="9" y1="12" x2="15" y2="12" />
                          <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                        Subir Foto
                        <input type="file" accept="image/*" name="avatar" onChange={handleFile} />
                      </div>
                    </section>

                    <div ref={alertRef} className="alert d-none">
                      Algo salio mal
                    </div>

                    <section className="previsualizacion">
                      <div className="contImagen">
                        <img src={selectFoto} alt="foto de perfil" />
                      </div>
                    </section>

                    <button onClick={() => subirFoto()}>Actualizar foto de perfil</button>

                  </div>
                </Modal>

                <Modal
                  estado={showCambiarPortada}
                  cambiarEstado={setShowCambiarPortada}
                  titulo="Actualizar foto de portada"
                >
                  <div className="modalConfPerfil">

                    <section className="contInputFile">
                      <div className="inputFile">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="12" cy="12" r="9" />
                          <line x1="9" y1="12" x2="15" y2="12" />
                          <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                        Subir Foto
                        <input type="file" accept="image/*" name="avatar" onChange={handleFilePortada} />
                      </div>
                    </section>

                    <div ref={alertRef} className="alert d-none">
                      Algo salio mal
                    </div>

                    <section className="previsualizacion">
                      <div className="contImagenPortada">
                        <img src={selectPortada} alt="foto de perfil" />
                      </div>
                    </section>

                    <button onClick={() => subirPortada()}>Actualizar foto de portada</button>

                  </div>
                </Modal>

                <div id="ContenedorFeedPerfilNegocioGeneral">

                  <div id="ContenedorFeedPerfilNegocio">

                    <section id="PortadaPerfilAnfitrion">
                      <img src={user.portada} id="ImagePortadaPerfilAnfitrion" />

                    </section>
                    <button className="fileSelect" onClick={() => setShowCambiarPortada(!showCambiarPortada)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera-plus" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="13" r="3" /><path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><line x1="15" y1="6" x2="21" y2="6" /><line x1="18" y1="3" x2="18" y2="9" /></svg>
                    </button>

                    <section id="InfPerfilAnfitrion">
                      <section id="DatosPerfilAnfitrion">
                        <section className="contOpiniones">
                          <div>
                            <div className="contBeer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.713 9.87c-.103-3.382-.495-6.58-1.192-8.399-.954-.98-4.054-1.471-7.154-1.471-3.097 0-6.193.49-7.148 1.471-.821 2.144-1.219 6.204-1.219 10.223 0 4.314.459 8.581 1.346 10.374 1.147 1.287 4.087 1.932 7.027 1.932 2.938 0 5.875-.644 7.022-1.932.29-.587.535-1.439.732-2.471.318-1.658.207-2.896 2.874-2.896v-3.6c-2.418 0-2.224-1.1-2.288-3.231zm-13.284 10.758c-.596-2.462-1.506-9.642-.293-15.547.67.141 1.364.247 1.981.3-.846 5.634-.743 10.673.366 15.869-1.087-.137-2.054-.622-2.054-.622zm8.83-17.16c-.6.121-.847.532-.838 1.058.017.942.727 2.161.794 2.813.1.977-.506 1.661-1.46 1.661-.93 0-1.475-.733-1.401-1.66.055-.689.883-1.782.765-2.819-.104-.92-.778-.849-1.39-.849-2.909 0-5.729-.443-5.729-.879s2.82-.79 5.729-.79 5.268.354 5.268.79c0 .233-.683.463-1.738.675zm11.741 14.532h-1.776l-.37-1.484c-.144-.43-.546-.72-1-.72h-.854v-1.78h1.07c1.024 0 1.935.65 2.267 1.618l.663 2.366zm-2.559-5h-.935l-.498-3.653c-.079-.576.369-1.09.952-1.09.579 0 1.027.509.953 1.083l-.472 3.66z" /></svg></div>
                            <div className="contBeer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.111 1.43c-.765-.883-1.924-1.43-3.186-1.43-1.159 0-2.237.458-3.002 1.228-2.087-.234-3.923 1.315-3.923 3.299 0 .899.38 1.715.994 2.314.042 3.466 1.751 6.327 2 9.349.141 1.689-.282 4.186-.593 5.713-.284 1.399 2.165 2.097 4.616 2.097 2.455 0 4.913-.7 4.63-2.096-.311-1.528-.733-4.024-.595-5.713.251-3.022 1.961-5.885 2.001-9.353.586-.579.947-1.362.947-2.225 0-1.951-1.834-3.468-3.889-3.183zm-4.295 20.724c-.271-.014-.543-.035-.799-.067-.351-.044-.588-.099-.743-.146.35-1.781.706-4.151.562-5.886-.127-1.532-.561-2.945-.98-4.312-.323-1.058-.796-2.575-.954-3.943.587.097 1.168.053 1.719-.122.249 2.63 1.557 4.923 1.756 7.759.171 2.447-.129 5.123-.561 6.717zm4.026-15.936c-1.058.962.162 2.555.255 3.419.097.896-.49 1.572-1.415 1.572-.9 0-1.43-.721-1.358-1.572.067-.806 1.26-2.346.367-3.41-.888.261-1.888.058-2.588-.604-.358.467-.939.77-1.592.77-1.089 0-1.971-.835-1.971-1.865s.882-1.865 1.971-1.865c.381 0 .738.103 1.04.282.393-.874 1.308-1.487 2.374-1.487 1.19 0 2.192.765 2.488 1.804.322-.254.736-.408 1.189-.408 1.026 0 1.857.788 1.857 1.759.001 1.284-1.401 2.123-2.617 1.605z" /></svg></div>
                          </div>
                          <div>
                            <div className="contPolice"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.377 11.082c-.06 1.929-2.229 3.126-8.409 3.126-6.193 0-8.358-1.203-8.409-3.139 1.508 0 4.379-1.958 8.409-1.958 3.927-.001 7.144 1.971 8.409 1.971zm-8.408 4.09c-2.062 0-3.74-.131-5.078-.397.062.555.469 3.322 2.409 3.322 1.721 0 1.673-1.316 2.721-1.316 1.047 0 1.169 1.316 2.852 1.316 2.09 0 2.46-3.063 2.494-3.389-1.387.311-3.169.464-5.398.464zm6.405-.741c-.04 2.171-.717 4.769-2.28 6.437-1.048 1.119-2.377 1.687-3.949 1.687-1.575 0-2.898-.533-3.931-1.582-1.646-1.673-2.302-4.345-2.396-6.461-.523-.158-1.01-.347-1.484-.628-.016 2.472.704 5.942 2.821 8.094 1.321 1.341 3 2.022 4.99 2.022 1.972 0 3.712-.745 5.033-2.153 2.131-2.273 2.76-5.679 2.661-8.111-.459.308-.944.521-1.465.695zm-6.237-10.984l-.313.623-.701.1.507.485-.119.685.626-.324.627.324-.12-.685.507-.485-.7-.1-.314-.623zm7.211-.206s-2.537-.686-7.348-3.241c-4.812 2.555-7.348 3.241-7.348 3.241s-1.295 2.4-3.652 5.016l2.266 1.908c1.533-.165 4.64-2.082 8.734-2.082s7.201 1.917 8.734 2.083l2.266-1.909c-2.357-2.616-3.652-5.016-3.652-5.016zm-6.345 3.214c-.526.131-.605.188-.875.402-.269-.214-.349-.271-.875-.402-.731-.183-1.151-.656-1.151-1.299 0-.359.147-.691.318-1.146.192-.513.083-.675-.119-.882l-.171-.176.987-.819c.098.098.235.278.486.278.248 0 .416-.175.528-.271.102.09.268.271.523.271.248 0 .381-.171.49-.281l.983.823-.172.176c-.202.207-.311.369-.119.882.17.455.318.786.318 1.146 0 .641-.42 1.115-1.151 1.298z" /></svg></div>
                            <div className="contPolice"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.217 9.054c-.981.163-1.995.332-2.99 1.305-1.758 1.719-1.414 4.038-.294 5.574.034-.606.649-1.104 1.243-1.053-.739-1.099-.767-2.415.22-3.38.547-.535 1.196-.817 1.877-.817.76 0 1.535.349 2.184.982 1.052 1.029 1.513 2.656.169 3.971-.506.494-1.122.755-1.783.755-.593 0-1.22-.212-1.768-.598-.456-.322-.889-.471-1.288-.08-.338.331-.336.889.238 1.311.855.629 1.867.976 2.848.976 1.092 0 2.101-.422 2.917-1.221 1.046-1.023 1.207-2.015 1.363-2.974.148-.912.289-1.773 1.172-2.636l-3.363-3.289c-.884.864-1.788 1.015-2.745 1.174zm3.027 1.544c.063-.062.098-.147.094-.235-.004-.106.036-.214.119-.294.158-.155.414-.155.572 0s.158.405 0 .56c-.082.081-.192.12-.301.116-.09-.003-.177.03-.24.092l-.244.238-.244-.238.244-.239zm2.628-2.806l.731.873c-.253.195-.535.451-.874.778l-.808-.803c.336-.323.644-.608.951-.848zm3.531-.468l-.759.905c-.204-.07-.412-.103-.644-.103s-.439.033-.645.104l-.759-.905c.417-.209.866-.325 1.404-.325.539 0 .987.116 1.403.324zm.869 2.119c-.341-.327-.622-.583-.876-.778l.731-.873c.308.24.615.525.951.848l-.806.803zm8.502.916c-.995-.973-2.01-1.142-2.99-1.305-.958-.16-1.862-.31-2.746-1.174l-3.363 3.29c.883.863 1.023 1.725 1.172 2.636.156.959.317 1.951 1.363 2.974.816.798 1.825 1.22 2.917 1.22.981 0 1.993-.347 2.849-.976.574-.422.576-.98.238-1.311-.399-.391-.831-.243-1.288.08-.547.386-1.175.598-1.768.598-.661 0-1.277-.261-1.782-.755-1.344-1.314-.884-2.941.169-3.971.647-.633 1.423-.982 2.183-.982.681 0 1.33.282 1.877.817.987.966.959 2.282.22 3.38.594-.051 1.209.447 1.243 1.053 1.12-1.536 1.463-3.855-.294-5.574zm-6.018.716l-.243-.238c-.063-.062-.151-.095-.241-.092-.108.004-.218-.035-.301-.116-.158-.155-.158-.405 0-.56s.415-.155.573 0c.082.081.122.188.118.294-.004.088.03.173.094.235l.244.239-.244.238z" /></svg></div>
                          </div>
                          <div>
                            <div className="contLike"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z" /></svg></div>
                            <div className="contLike"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.352 2.107c2.481 1.759 2.474 1.736 5.493 1.718.244 0 .459.136.524.331.917 2.789.942 2.838 3.438 4.554.176.122.227.307.174.453-.971 2.801-.979 2.834 0 5.676.053.145.003.33-.175.453-2.469 1.699-2.505 1.73-3.437 4.553-.065.195-.28.331-.526.331-2.995-.019-3-.049-5.49 1.717-.205.145-.501.144-.704 0-2.475-1.751-2.463-1.739-5.493-1.717-.244 0-.459-.136-.523-.329-.826-2.499-.907-2.82-2.925-4.202l-.514-.354c-.176-.122-.227-.307-.174-.453.866-2.504.999-2.805.193-5.114-.146-.424-.374-.769-.019-1.016 2.458-1.691 2.506-1.722 3.437-4.553.065-.195.28-.331.526-.331 3.009.021 2.996.048 5.491-1.717.206-.145.503-.141.704 0zm-.352-2.107c-.527 0-1.055.157-1.502.471-1.757 1.236-1.77 1.362-3.152 1.362l-1.183-.008h-.008c-1.104 0-2.083.685-2.421 1.696-.812 2.433-.533 2.055-2.68 3.544-.675.468-1.054 1.212-1.054 1.982 0 .254.041.512.127.763.83 2.428.827 1.963 0 4.38-.086.251-.127.508-.127.763 0 .77.379 1.514 1.055 1.982 2.147 1.489 1.869 1.114 2.68 3.544.338 1.011 1.316 1.696 2.421 1.696h.008c2.652-.008 2.189-.155 4.335 1.354.446.313.974.471 1.501.471s1.055-.157 1.502-.471c1.76-1.238 1.762-1.361 3.181-1.361l1.154.007h.008c1.104 0 2.083-.685 2.421-1.696.812-2.428.528-2.053 2.68-3.544.675-.469 1.054-1.212 1.054-1.982 0-.254-.041-.512-.127-.763-.831-2.428-.827-1.963 0-4.38.086-.251.127-.509.127-.763 0-.77-.379-1.514-1.055-1.982-2.152-1.492-1.868-1.117-2.68-3.544-.338-1.011-1.316-1.696-2.421-1.696h-.008l-1.156.007c-1.416 0-1.42-.124-3.179-1.361-.446-.314-.974-.471-1.501-.471zm4.178 8.333c0-.466-.826-1.333-2.426-1.333-2.502 0-3.408 1.5-6.752 1.5v4.964c1.766.271 3.484.817 4.344 3.802.239.831.39 1.734 1.187 1.734 1.188 0 1.297-2.562.844-4.391.656-.344 1.875-.468 2.489-.442.886.036 1.136-.409 1.136-.745 0-.505-.416-.675-.677-.755-.305-.094-.444-.404-.016-.461.418-.056.63-.328.63-.61 0-.323-.277-.66-.844-.705-.348-.027-.434-.312-.016-.406.351-.08.549-.326.549-.591 0-.314-.279-.654-.913-.771-.383-.07-.421-.445-.016-.477.345-.027.481-.146.481-.313z" /></svg></div>
                          </div>
                          <div>
                            <div className="contRich"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 7h-19v11h-1v-12h20v1zm-2-2h-19v11h-1v-12h20v1zm-6 6c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zm.15 4.484v.315h-.3v-.299c-.311-.005-.632-.079-.898-.217l.135-.493c.287.11.669.229.968.162.345-.078.415-.433.034-.604-.279-.129-1.133-.242-1.133-.973 0-.409.312-.775.895-.855v-.319h.301v.305c.217.006.461.043.732.126l-.108.493c-.23-.08-.485-.154-.733-.139-.446.026-.486.413-.174.575.514.242 1.182.42 1.182 1.063 0 .516-.404.791-.901.86zm-10.15-7.484v12h20v-12h-20zm18 10h-16v-8h16v8z" /></svg></div>
                            <div className="contRich"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.324 11.387c-.547-1.272-2.073-2.124-3.41-1.901-1.337.222-1.979 1.433-1.432 2.706.578 1.343 2.234 2.202 3.598 1.863 1.209-.299 1.766-1.456 1.244-2.668zm-1.683 1.584l.12.267-.253.052-.113-.254c-.262.047-.561.041-.836-.031l-.076-.451c.227.035.509.067.725.023l.145-.047c.258-.126.179-.449-.204-.525-.284-.063-1.038-.017-1.319-.642-.158-.353-.041-.722.414-.891l-.125-.278.252-.052.12.266c.185-.031.401-.042.655-.02l.102.446c-.197-.025-.41-.047-.596-.009l-.07.018c-.359.095-.244.436.075.519.527.122 1.156.161 1.404.712.199.445-.034.75-.42.897zm7.198-7.971c-6.829 4.423-14.376-.351-19.839 4.92l4.161 9.08c5.854-4.962 13.835-.264 19.839-4.92l-4.161-9.08zm-12.843 10.475c-.815-.511-2.002-.838-2.875-.762l-1.189-2.597c.567-.608 1.021-1.684 1.169-2.655.185-.059.371-.117.566-.165 3.358-.833 7.543.079 11.852-.99.312-.077.609-.174.908-.269.678.475 1.511.809 2.302.923l1.316 2.871c-.532.673-.912 1.483-1.105 2.327-3.865 1.048-8.549-.094-12.944 1.317z" /></svg></div>
                          </div>
                        </section>
                        <section>
                          <h1>{user.nombre_cargo}</h1>
                          <p>4.9 Opiniones</p>
                        </section>
                      </section>

                      <section id="ContFotoPerfilAnfitrion">
                        <div id="FotoPerfilAnfitrion">
                          <img src={user.perfil} id="ImageFotoPerfilAnfitrion" />
                        </div>
                      </section>
                      <button className="fileSelect" onClick={() => setShowCambiarFoto(!showCambiarFoto)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera-plus" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="13" r="3" /><path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><line x1="15" y1="6" x2="21" y2="6" /><line x1="18" y1="3" x2="18" y2="9" /></svg>
                      </button>
                    </section>
                    <section id="InfOpinionesAnfitrion">
                      <h2>Calificacion - 4.9 (19 Opiniones)</h2>

                      <Modal
                        estado={showModal}
                        cambiarEstado={setShowModal}
                        titulo={"Comentar"}
                      >
                        <div id="contComentarModal">
                          <textarea name="comentario" id="txtComentar" placeholder="Comenta algo interesante" onChange={handleComentario} />
                          <button onClick={() => actionPublicar()}>Comentar</button>
                        </div>
                      </Modal>

                      <div id="Comentar">
                        <section className="contFotoUsuario">
                          <img src={user.perfil} alt="Foto Usuario" />
                        </section>

                        <section className="comentario">
                          <p onClick={() => setShowModal(!showModal)}>
                            Comenta algo interesante
                          </p>
                        </section>
                      </div>

                      <ComentariosNegocio id_negocio={user.id} />

                    </section>
                  </div>
                </div>
              </>
            ) : visua === 6 ? (
              <>
                <div className="contHomeChat">
                  <AllChats />
                </div>
              </>
            ) : (
              <>
                <section className="contMapaNegocios">
                  <Suspense fallback={<Loading />}>
                    <MapNegocio mapSet={handleSetMap} map={map} />
                  </Suspense>
                </section>
              </>
            )
          }
        </div>
      </section>
    </section>
  </div>
</>