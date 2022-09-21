import React from "react";
import '../stylesheets/InputText.css'

function InputText({ type, children }){
    return(
        <div className="inputBox">
            <input type={type} required />
            <span>{children}</span>
        </div>
    );
}

export default InputText;