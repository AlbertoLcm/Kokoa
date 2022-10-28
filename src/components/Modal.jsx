// Ventana modal
import React from 'react';
import styled from 'styled-components';

const Modal = ({ children, estado, cambiarEstado }) => {


  return (
    <> {
      estado && <Overlay>
        <ContModal>
          <Ecabezado>
            <div>
              <h2>Editar informacion</h2>
            </div>
            <ButtonCerrar onClick={() => cambiarEstado(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M10 10l4 4m0 -4l-4 4" />
              </svg>
            </ButtonCerrar>
          </Ecabezado>

          {children}

        </ContModal>
      </Overlay>
    } </>
  );
};

export default Modal;

const Overlay = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    padding: 40px;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ContModal = styled.div`
    width: 500px;
    min-height: 100px;
    background-color: #140016;
    position: relative;
    border-radius: 10px;
    padding: 20px;
    z-index: 1002;
    color: #3f3f3f;

`;

const Ecabezado = styled.div`
    display: flex;
    aling-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f354;
    color: #f3f3f3;
    h3 {
        font-family: 'Josefin Sans';
    }
`;

const ButtonCerrar = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;
    color: #1766DC;
`;
