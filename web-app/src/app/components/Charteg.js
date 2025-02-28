'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';

// Register the components with ChartJS
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null); // State to store the data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        
        const response = await fetch('http://localhost:8000/api/stats'); // Replace with your API URL
        const data = await response.json();

        // Assuming the API returns data in the following format:
        // data = [{date: "2022-01-01", value: 10}, {date: "2022-01-02", value: 20}, ...]

        // Format the data to be used in the chart
        const labels = data.map(item => item.hitCount); // X-axis labels (dates)
        const values = data.map(item => item.loginCount); // Y-axis values (e.g., sales, temperature, etc.)

        // Set the chart data
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'My Data',
              data: values,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
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
    return <div>Loading...</div>; // Loading message
  }

  if (!chartData) {
    return <div>No data available</div>; // If no data is fetched
  }

  return (
    <div>
      <h2>Chart Title</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
