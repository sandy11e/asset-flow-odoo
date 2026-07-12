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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true } },
    },
    scales: {
      y: { beginAtZero: true, grid: { borderDash: [2, 2] } },
      x: { grid: { display: false } },
    },
    borderRadius: 4,
  };

  return <Bar options={{ ...defaultOptions, ...options }} data={data} />;
};
