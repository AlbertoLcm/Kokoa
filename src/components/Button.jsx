import React from "react";
import '../stylesheets/Buttons.css'



const Button = ({ tipo, children, action }) => (
    <button 
        className={ tipo }
        onClick = { () => action}
    > { children } </button>
);


export default Button;