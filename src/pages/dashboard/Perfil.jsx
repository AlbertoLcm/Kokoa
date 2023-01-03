import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import ComentariosNegocio from "../../components/social/ComentariosNegocio";
import instance from "../../api/axios";

const Perfil = () => {

  const { user } = useAuth();
  // Variables opinion
  const [allOpinions, setAllOpinions] = useState([]);
  const [opinionGeneral, setOpinionGeneral] = useState([]);
  const [opinGenCantidad, setOpinGenCantidad] = useState(0);
  const [opinGenCalidad, setOpinGenCalidad] = useState(0);
  const [opinGenPrecio, setOpinGenPrecio] = useState(0);
  const [opinGenSeguridad, setOpinGenSeguridad] = useState(0);
  const [opinGenAmbiente, setOpinGenAmbiente] = useState(0);
  // Fin vairables opinion
  // Obtencion de las opiniones del negocio
  useEffect(() => {
    instance.get(`/negocios/reacciones/${user.id}`)
      .then((res) => {
        setAllOpinions(res.data)
      })
  }, []);
  // Calculo de los promedios de la opiniones por tipo del negocio
  useEffect(() => {
    const opCant = allOpinions.filter((opinion) => opinion.tipo === 1)
    const opCali = allOpinions.filter((opinion) => opinion.tipo === 2)
    const opPrec = allOpinions.filter((opinion) => opinion.tipo === 3)
    const opSegu = allOpinions.filter((opinion) => opinion.tipo === 4)
    const opAmbi = allOpinions.filter((opinion) => opinion.tipo === 5);

    let va = 0;
    if(opCant.length > 0){
      opCant.forEach((opinion) => {
        va = va + parseInt(opinion.valuacion)
      })
      setOpinGenCantidad(va / opCant.length);
    }
    va = 0;
    if(opCali.length > 0){
      opCali.forEach((opinion) => {
        va = va + parseInt(opinion.valuacion)
      })
      setOpinGenCalidad(va / opCali.length)
    }
    va = 0;
    if(opPrec.length > 0){
      opPrec.forEach((opinion) => {
        va = va + parseInt(opinion.valuacion)
      })
      setOpinGenPrecio(va / opPrec.length)
    }
    va = 0;
    if(opSegu.length > 0){
      opSegu.forEach((opinion) => {
        va = va + parseInt(opinion.valuacion)
      })
      setOpinGenSeguridad(va / opSegu.length)
    }
    va = 0;
    if(opAmbi.length > 0){
      opAmbi.forEach((opinion) => {
        va = va + parseInt(opinion.valuacion)
      })
      setOpinGenAmbiente(va / opAmbi.length)
    }
  }, [allOpinions])
  // Calculo de la opinion general del negocio
  useEffect(() => {
    let divisor = 0;
    let va = 0 + opinGenCantidad;
    if(opinGenCantidad > 0){divisor= divisor + 1 }
    va= va + opinGenCalidad;
    if(opinGenCalidad > 0){divisor= divisor + 1 }
    va= va + opinGenPrecio;
    if(opinGenPrecio > 0){divisor= divisor + 1 }
    va= va + opinGenSeguridad;
    if(opinGenSeguridad > 0){divisor= divisor + 1 }
    va= va + opinGenAmbiente;
    if(opinGenAmbiente > 0){divisor= divisor + 1 }
    if(divisor > 0) {
      va = va / divisor
    }
    setOpinionGeneral(va)
  }, [opinGenAmbiente, opinGenCantidad, opinGenCalidad, opinGenPrecio, opinGenSeguridad]);

  return (
    <div className="contDashboardPerfil">
      <div id="ContenedorFeedPerfilNegocioGeneral">

        <div id="ContenedorFeedPerfilNegocio">

          <section id="PortadaPerfilAnfitrion">
            <img src={user.portada} id="ImagePortadaPerfilAnfitrion" />
          </section>

          <section id="InfPerfilAnfitrion">
            <section id="DatosPerfilAnfitrion">
              <section>
                <h1>{user.nombre_cargo}</h1>
                <p>{allOpinions.length > 0 ? (<>OpinionGeneral - {opinionGeneral} ( {allOpinions.length} Opiniones)</>) : ( <span>Sin Calificaciones</span> )  }</p>
              </section>
            </section>

            <section id="ContFotoPerfilAnfitrion">
              <div id="FotoPerfilAnfitrion">
                <img src={user.perfil} id="ImageFotoPerfilAnfitrion" />
              </div>
            </section>
          </section>
          <section id="InfOpinionesAnfitrion">
            <h2>{allOpinions.length > 0 ? (<>Calificacion - {opinionGeneral} ( {allOpinions.length} Opiniones)</>) : ( <span>Sin Calificaciones</span> )  }</h2>

            <section className="contOpiniones">
            <center>
              <div className="opCantidad">
                <div className="contBeer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.713 9.87c-.103-3.382-.495-6.58-1.192-8.399-.954-.98-4.054-1.471-7.154-1.471-3.097 0-6.193.49-7.148 1.471-.821 2.144-1.219 6.204-1.219 10.223 0 4.314.459 8.581 1.346 10.374 1.147 1.287 4.087 1.932 7.027 1.932 2.938 0 5.875-.644 7.022-1.932.29-.587.535-1.439.732-2.471.318-1.658.207-2.896 2.874-2.896v-3.6c-2.418 0-2.224-1.1-2.288-3.231zm-13.284 10.758c-.596-2.462-1.506-9.642-.293-15.547.67.141 1.364.247 1.981.3-.846 5.634-.743 10.673.366 15.869-1.087-.137-2.054-.622-2.054-.622zm8.83-17.16c-.6.121-.847.532-.838 1.058.017.942.727 2.161.794 2.813.1.977-.506 1.661-1.46 1.661-.93 0-1.475-.733-1.401-1.66.055-.689.883-1.782.765-2.819-.104-.92-.778-.849-1.39-.849-2.909 0-5.729-.443-5.729-.879s2.82-.79 5.729-.79 5.268.354 5.268.79c0 .233-.683.463-1.738.675zm11.741 14.532h-1.776l-.37-1.484c-.144-.43-.546-.72-1-.72h-.854v-1.78h1.07c1.024 0 1.935.65 2.267 1.618l.663 2.366zm-2.559-5h-.935l-.498-3.653c-.079-.576.369-1.09.952-1.09.579 0 1.027.509.953 1.083l-.472 3.66z"/></svg> </div>
                <label>Cantidad</label>
                <p>{ opinGenCantidad !== 0 ? (opinGenCantidad) : ("N/A") }</p>
              </div>
            </center>
            <center>
              <div className="opCalidad">
                <div className="contLike"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg></div>
                <label>Calidad</label>
                <p>{ opinGenCalidad !== 0 ? (opinGenCalidad) : ("N/A") }</p>
              </div>
            </center>
            <center>
              <div className="opPrecio">
                <div className="contRich"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 7h-19v11h-1v-12h20v1zm-2-2h-19v11h-1v-12h20v1zm-6 6c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zm.15 4.484v.315h-.3v-.299c-.311-.005-.632-.079-.898-.217l.135-.493c.287.11.669.229.968.162.345-.078.415-.433.034-.604-.279-.129-1.133-.242-1.133-.973 0-.409.312-.775.895-.855v-.319h.301v.305c.217.006.461.043.732.126l-.108.493c-.23-.08-.485-.154-.733-.139-.446.026-.486.413-.174.575.514.242 1.182.42 1.182 1.063 0 .516-.404.791-.901.86zm-10.15-7.484v12h20v-12h-20zm18 10h-16v-8h16v8z"/></svg></div>
                <label>Precio</label>
                <p>{ opinGenPrecio !== 0 ? (opinGenPrecio) : ("N/A") }</p>
              </div>
            </center>
            <center>
              <div className="opSeguridad">
                <div className="contPolice"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.377 11.082c-.06 1.929-2.229 3.126-8.409 3.126-6.193 0-8.358-1.203-8.409-3.139 1.508 0 4.379-1.958 8.409-1.958 3.927-.001 7.144 1.971 8.409 1.971zm-8.408 4.09c-2.062 0-3.74-.131-5.078-.397.062.555.469 3.322 2.409 3.322 1.721 0 1.673-1.316 2.721-1.316 1.047 0 1.169 1.316 2.852 1.316 2.09 0 2.46-3.063 2.494-3.389-1.387.311-3.169.464-5.398.464zm6.405-.741c-.04 2.171-.717 4.769-2.28 6.437-1.048 1.119-2.377 1.687-3.949 1.687-1.575 0-2.898-.533-3.931-1.582-1.646-1.673-2.302-4.345-2.396-6.461-.523-.158-1.01-.347-1.484-.628-.016 2.472.704 5.942 2.821 8.094 1.321 1.341 3 2.022 4.99 2.022 1.972 0 3.712-.745 5.033-2.153 2.131-2.273 2.76-5.679 2.661-8.111-.459.308-.944.521-1.465.695zm-6.237-10.984l-.313.623-.701.1.507.485-.119.685.626-.324.627.324-.12-.685.507-.485-.7-.1-.314-.623zm7.211-.206s-2.537-.686-7.348-3.241c-4.812 2.555-7.348 3.241-7.348 3.241s-1.295 2.4-3.652 5.016l2.266 1.908c1.533-.165 4.64-2.082 8.734-2.082s7.201 1.917 8.734 2.083l2.266-1.909c-2.357-2.616-3.652-5.016-3.652-5.016zm-6.345 3.214c-.526.131-.605.188-.875.402-.269-.214-.349-.271-.875-.402-.731-.183-1.151-.656-1.151-1.299 0-.359.147-.691.318-1.146.192-.513.083-.675-.119-.882l-.171-.176.987-.819c.098.098.235.278.486.278.248 0 .416-.175.528-.271.102.09.268.271.523.271.248 0 .381-.171.49-.281l.983.823-.172.176c-.202.207-.311.369-.119.882.17.455.318.786.318 1.146 0 .641-.42 1.115-1.151 1.298z"/></svg></div>
                <label>Seguridad</label>
                <p>{ opinGenSeguridad !== 0 ? (opinGenSeguridad) : ("N/A") }</p>
              </div>
            </center>
            <center>
              <div className="opAmbiente">
                <div className="contAmb"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18.028 24h-.018c-.268 0-.49-.213-.499-.483-.05-1.462.19-2.847 2.265-3.08.795-.089.858-.367.996-.977.229-1.008.607-1.922 2.701-2.032.285-.02.512.197.526.473.014.276-.197.512-.473.526-1.512.079-1.618.547-1.778 1.254-.152.667-.359 1.581-1.861 1.751-1.016.113-1.432.423-1.377 2.051.01.276-.207.507-.482.517zm-8.342-18.714c.241.213.53.366.842.444l3.566.896c.3.076.617.051.903-.07 1.082-.461 3.862-1.684 5.062-2.155.76-.299 1.268.63.655 1.097-1.39 1.062-5.714 4.086-5.714 4.086l-.862 3.648s1.785 1.86 2.544 2.7c.423.469.696.919.421 1.595-.481 1.181-1.457 3.477-1.908 4.547-.255.605-1.164.453-1.015-.322.217-1.128.781-4.016.781-4.016l-3.558-1.62s-.253 5.953-.327 7.296c-.019.341-.253.589-.582.588-.249-.001-.508-.173-.612-.596-.534-2.178-2.142-8.99-2.142-8.99-.209-.837-.329-1.53-.053-2.564l.915-3.85s-2.726-3.984-3.709-5.476c-.402-.611.356-1.18.808-.78l3.985 3.542zm-7.178 8.489l-.853.511 2.708 4.524c-1.788.306-2.917 1.904-2.048 3.356.537.897 1.753 1.106 2.622.586 1.034-.619 1.774-1.952.979-3.284l-3.408-5.693zm17.721-5.193l.904 1.669 1.867.344-1.308 1.376.249 1.882-1.712-.819-1.713.819.25-1.882-1.309-1.376 1.867-.344.905-1.669zm-17.298-2.935l-2.934 2.935 2.934 2.935 2.935-2.935-2.935-2.935zm9.055-5.398c1.36-.626 2.972-.03 3.597 1.33.626 1.36.03 2.972-1.33 3.598-1.36.625-2.972.029-3.598-1.331-.625-1.36-.029-2.972 1.331-3.597z"/></svg></div>
                <label>Ambiente</label>
                <p>{ opinGenAmbiente !== 0 ? (opinGenAmbiente) : ("N/A") }</p>
              </div>
            </center>
          </section>

            <div id="Comentar">
              <section className="contFotoUsuario">
                <img src={user.perfil} alt="Foto Usuario" />
              </section>

              <section className="comentario">
                <p>
                  Comenta algo interesante
                </p>
              </section>
            </div>

            <ComentariosNegocio id_negocio={user.id} />

          </section>
        </div>
      </div>
    </div>
  );
}
export default Perfil;