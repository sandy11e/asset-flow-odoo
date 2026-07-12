import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { family: "'Inter', sans-serif", size: 12 },
          color: '#475569',
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: !!title,
        text: title,
        font: { family: "'Inter', sans-serif", size: 16, weight: 'bold' },
        color: '#1e293b'
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { family: "'Inter', sans-serif", size: 13 },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 10,
        cornerRadius: 8,
      }
    },
    cutout: '0%', // It's a pie chart, not a doughnut
  };

  return (
    <div style={{ height: `${height}px` }} className="w-full flex justify-center">
      <Pie options={options} data={data} />
    </div>
  );
};

export default PieChart;
