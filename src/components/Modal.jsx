// Ventana modal
import React from 'react';
import styled from 'styled-components';

const Modal = ({ children, estado, cambiarEstado }) => {


    
    
    return (
        <>
        {estado &&
            <Overlay>
                <ContModal>
                    <Ecabezado>
                        <ButtonCerrar onClick={() => cambiarEstado(false)}>
                            X
                        </ButtonCerrar>
                    </Ecabezado>
                        {children}
                </ContModal>
            </Overlay>
    }
        </>
    );
};

export default Modal;

const Overlay = styled.div`
    width: 100%;
    height: 100vh;
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
    background-color: #f3f3f3;
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
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    
    h3 {
        font-family: 'Josefin Sans';
        font-weight: 300;
        font-size: 16px;
        color: #1766DC;
    }
`;

const ButtonCerrar = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;
    color: #1766DC;
    &:hover {
        background-color: #f2f2f2;
    }
`;