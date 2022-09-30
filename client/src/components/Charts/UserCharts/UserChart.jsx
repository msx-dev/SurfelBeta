import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "./UserChart.css";

Chart.register(...registerables);


export default function UserChart() {

    const [usersMonth, setUsersMonth] = useState([]);

    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
    const data = {
        labels: labels,
        datasets: [
          {
            borderJoinStyle: 'miter',
            borderCapStyle: 'butt',
            pointRadius: 1,
            label: 'New Users',
            fill: true,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,0.2)',
            borderWidth: 1,
            data: usersMonth
            
          }
        ]
      }
    
      const config = {
        type: 'line',
        data: data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
            }
          },
          options: {
            scales: {
              y: {
                ticks: {
                  color: 'red',
                  font: {
                    size: 14,
                  }
                }
              },
              x: {
                ticks: {
                  color: 'red',
                  font: {
                    size: 14
                  }
                }
              }
            }
          }
        },
      };

    useEffect(()=> {
        const getUsersByMonth = async () => {
            
            try {
                

                const response = await axios.get("/users/date");
                //console.log(response.data.rated);
                const monthlyUsers = response.data;

                setUsersMonth(monthlyUsers);    
            } catch (error) {
                console.log(error);
            }
        }

        getUsersByMonth();
    }, [])
  return (
    <div className='line-chart'>
        <Line options={config} data={data} />
    </div>
  )
}
