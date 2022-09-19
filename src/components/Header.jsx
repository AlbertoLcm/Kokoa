import React from "react";
import Button from "./Button";
import '../stylesheets/Header.css'

function Header({ tipo, children }) {
    return(
        <header className={ tipo }>
            <section className="contLogo">
                <div className="logo">
                    Kokoa
                </div>
            </section>
            <section className="contBotones">
               {children}
            </section>
        </header>
    );
}

export default Header;