import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
  maxY?: number;
}

const LineChart = ({ title, labels, datasets, maxY }: LineChartProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxY,
      },
    },
    elements: {
      line: {
        tension: 0.3, // Smooth curves
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} />;
};

export default LineChart;