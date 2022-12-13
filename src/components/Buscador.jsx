import React from "react";

const Buscador = ({ placeholder }) => {
  return (
    <section className="contBuscador">
      <form method="POST" >
        <input type="text" className="buscador" placeholder={placeholder} />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
      </form>
    </section>
  );
};

export default Buscador;