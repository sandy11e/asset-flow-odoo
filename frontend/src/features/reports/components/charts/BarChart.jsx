import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components globally for this component
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title, height = 300 }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: "'Inter', sans-serif", size: 12 },
          color: '#475569'
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
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9', drawBorder: false },
        ticks: { color: '#64748b', font: { family: "'Inter', sans-serif" } }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#64748b', font: { family: "'Inter', sans-serif" } }
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }} className="w-full">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
