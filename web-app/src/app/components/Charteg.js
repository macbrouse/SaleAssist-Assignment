'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charteg = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://saleassist-assignment.onrender.com/api/stats');
        const data = await response.json();

        const hitTiming = data[0]?.hitTiming || [];
        const loginTiming = data[0]?.loginTiming || [];

        const labels = Array.from(new Set([...hitTiming, ...loginTiming])).sort();

        const hitCounts = labels.map((label) => hitTiming.filter(time => time === label).length);
        const loginCounts = labels.map((label) => loginTiming.filter(time => time === label).length);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Hits',
              data: hitCounts,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
            {
              label: 'Logins',
              data: loginCounts,
              fill: false,
              borderColor: 'rgba(255,99,132,1)',
              tension: 0.1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!chartData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>Hits and Logins Analytics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Charteg;
