import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AreaChart = ({ data, options }) => {
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
    elements: {
      line: {
        fill: true,
      },
    },
  };

  return <Line options={{ ...defaultOptions, ...options }} data={data} />;
};
