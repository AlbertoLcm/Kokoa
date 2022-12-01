import React from "react";
import '../../stylesheets/Loading.css';

const LoadingElement = () => {
  return (
    <div id="LoadingElement">
      <div className="spinnerLoading">
        <div className="fondoLoading"></div>
      </div>
    </div>
  );
};

export default LoadingElement;