import React, { useState } from "react";

const Recomendados = () => {

  const [eventos, setEventos] = useState([]);

  if (!eventos.length) {
    return (
      <section className="contGeneralSelectInicio">
        <div className="contSelectInicio">
          <p>Sección en desarrollo...</p>
        </div>
      </section>
    );
  }
};

export default Recomendados;