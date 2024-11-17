import React from 'react';
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
import type { Sale } from '../types';

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

interface SalesChartProps {
  sales: Sale[];
}

export function SalesChart({ sales }: SalesChartProps) {
  // Create a continuous date range for the current month
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const dateRange = [];
  
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    dateRange.push(new Date(d));
  }

  // Create a map of dates to commissions
  const commissionByDate = new Map();
  sales.forEach(sale => {
    const date = new Date(sale.date);
    const dateString = date.toISOString().split('T')[0];
    const existingCommission = commissionByDate.get(dateString) || 0;
    commissionByDate.set(dateString, existingCommission + (sale.totalCommission || 0));
  });

  // Calculate cumulative commission for each date
  let runningTotal = 0;
  const data = {
    labels: dateRange.map(date => date.toLocaleDateString()),
    datasets: [
      {
        label: 'Commission',
        data: dateRange.map(date => {
          const dateString = date.toISOString().split('T')[0];
          const dailyCommission = commissionByDate.get(dateString) || 0;
          runningTotal += dailyCommission;
          return runningTotal;
        }),
        borderColor: '#8c7862', // earth-600
        backgroundColor: 'rgba(140, 120, 98, 0.1)', // earth-600 with opacity
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8c7862',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8c7862',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#6b7280',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#6b7280',
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">
          Commission Trends
        </h3>
        <div className="text-sm text-earth-500 dark:text-earth-400">
          {sales.length} sales recorded
        </div>
      </div>
      <div className="h-[300px] bg-white dark:bg-earth-800 rounded-lg p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}