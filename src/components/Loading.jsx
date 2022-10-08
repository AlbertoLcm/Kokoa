import React from "react";
import '../stylesheets/Loading.css';

function Loading (){
    return (
        <div id="loading">
            <h1>Kokoa</h1>
            <div id="spinner">
                <div id="fondo"></div>
            </div>
        </div>
    )
}

export default Loading;