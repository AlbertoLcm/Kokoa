import React from "react";
import Button from "./Button";
import '../stylesheets/Header.css'

function Header({ tipo, boton }) {
    return(
        <header className={ tipo }>
            <section className="contLogo">
                <div className="logo">
                    Kokoa
                </div>
            </section>
            <section className="contBotones">
                {
                    boton ? <Button tipo={'boton3'}>{ boton }</Button> : <></>
                }
            </section>
        </header>
    );
}

export default Header;