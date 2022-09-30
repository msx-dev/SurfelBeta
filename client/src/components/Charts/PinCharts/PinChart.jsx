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
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
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