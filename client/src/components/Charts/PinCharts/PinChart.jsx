import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function PinChart() {

    const [pinsMonth, setPinsMonth] = useState([]);

    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'New Pins',
            fill: true,
            pointRadius: 1,
            lineTension: 0,
            backgroundColor: 'rgba(242, 228, 124, 0.6)',
            borderColor: 'rgba(242, 228, 124, 0.2)',
            borderWidth: 1,
            data: pinsMonth
          }
        ]
      }
    
      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      };

    useEffect(()=> {
        const getPinsByMonth = async () => {
            
            try {
                

                const response = await axios.get("/pins/new_date");
                //console.log(response.data.rated);
                const monthlyPins = response.data;
                
                setPinsMonth(monthlyPins);    
            } catch (error) {
                console.log(error);
            }
        }

        getPinsByMonth();
    }, [])


  return (
    <>
        <Line options={config} data={data} />
    </>
  )
}
