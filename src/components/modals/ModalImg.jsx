import React from "react";
import "../../stylesheets/components/ModalImg.css";

const ModalImg = ({ children, estado, titulo, cambiarEstado }) => {
  return (
    <>
      {estado &&
        <div className="backgroundModal" onClick={() => cambiarEstado(false)}>
          <button className="btnCloseModal" onClick={() => cambiarEstado(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </button>

          <div className="contenedorModal" onClick={() => {}}>
            <div className="contImg">
              {children}
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default ModalImg;