'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';

// Register the components with ChartJS
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        
        const response = await fetch('https://saleassist-assignment.onrender.com/api/stats'); 
        const data = await response.json();

        const labels = data.map(item => item.hitCount); 
        const values = data.map(item => item.loginCount); 
        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'User Traffic',
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
    return <div>Loading...</div>; 
  }

  if (!chartData) {
    return <div>No data available</div>; 
  }

  return (
    <div>
      <h2>User Analytics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
