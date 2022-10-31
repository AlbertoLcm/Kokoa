import React from "react";
import '../stylesheets/Loading.css';

function Loading() {
  return (
    <div id="Loading">
      <h1>Kokoa</h1>
      <div className="spinnerLoading">
        <div className="fondoLoading"></div>
      </div>
    </div>
  )
}

export default Loading;
