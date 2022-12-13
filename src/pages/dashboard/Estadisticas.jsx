import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../../stylesheets/pages/Dashboard.css'

const Estadisticas = () => {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    // labels: ['Culturales', 'Deportivos', 'Académicos', 'Por completar'],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 1, 2, 1],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };
  
  return (
    <div className="contDashboardEstadisticas">
      <div className="chart"> <Doughnut data={data} /> </div>
      <div className="chart"> <Doughnut data={data} /> </div>
    </div>
  );
}

export default Estadisticas;