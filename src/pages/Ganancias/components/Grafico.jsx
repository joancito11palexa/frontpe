// src/components/Ganancias/Grafico.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los módulos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export const Grafico = ({ data }) => (
  <Doughnut
    data={data}
    options={{
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "white",
          },
        },
      },
    }}
  />
);


