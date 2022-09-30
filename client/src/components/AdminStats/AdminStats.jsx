import "./AdminStats.css";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { CalculateGrowth } from "../../functions/Other/CalculateGrowth";
import GrowthChartPos from "../Charts/GrowthCharts/GrowthChartPos";
import UserChart from "../Charts/UserCharts/UserChart";
import PinChart from "../Charts/PinCharts/PinChart";
import GrowthChartNeg from "../Charts/GrowthCharts/GrowthChartNeg";


export default function AdminStats() {

    const [allUsers, setAllUsers] = useState();
    const [allPins, setAllPins] = useState();
    const [pinsMonth, setPinsMonth] = useState([]);
    const [usersMonth, setUsersMonth] = useState([]);
    const [newPinsGrowth, setNewPinsGrowth] = useState(0);
    const [newUsersGrowth, setNewUsersGrowth] = useState(0);
    const [newPinsGrowthAbs, setNewPinsGrowthAbs] = useState(0);
    const [newUsersGrowthAbs, setNewUsersGrowthAbs] = useState(0);
    const [reportedPins, setReportedPins] = useState([]);

    const d = new Date();
    let month = d.getMonth();


    useEffect(()=>{
        const getAllUsers = async () => {
            try {
               const response =  await axios.get("users/allUsers");

               setAllUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getReportedPins = async () => {
            try {
              const response = await axios.get("pins/reportedPins");
             
              setReportedPins(response.data.length);
            } catch (error) {
              console.log(error);
            }
          }

        const getAllPins = async () => {
            try {
               const response =  await axios.get("pins/allPins");
               setAllPins(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getPinsByMonth = async () => {
            
            try {
                

                const response = await axios.get("/pins/new_date");
                //console.log(response.data.rated);
                const monthlyPins = response.data;

                const growthPins = CalculateGrowth(monthlyPins);
                const pinsAbs = Math.abs(growthPins);

                setNewPinsGrowthAbs(pinsAbs);
                setNewPinsGrowth(growthPins);
                setPinsMonth(monthlyPins);    
            } catch (error) {
                console.log(error);
            }
        }

        const getUsersByMonth = async () => {
            
            try {
                const response = await axios.get("/users/date");
                //console.log(response.data.rated);
                const monthlyUsers = response.data;

                const growthUsers = CalculateGrowth(monthlyUsers);

                const usersAbs = Math.abs(growthUsers);

                setNewUsersGrowthAbs(usersAbs);
                setNewUsersGrowth(growthUsers);
                setUsersMonth(monthlyUsers);    
            } catch (error) {
                console.log(error);
            }
        }

        getUsersByMonth();
        getPinsByMonth();
        getAllUsers();
        getAllPins();
        getReportedPins();
    }, [])

    


  return (
    <div className="admin-stats">
    {/* 
        <h1>{allUsers}</h1>
        <h1>{allPins}</h1>
        <h1>{reportedPins}</h1>
        <div style={{ width: 200, height: 200 }}>
        <GrowthChartPos normalValue={newUsersGrowth} absoluteValue={newUsersGrowthAbs}/>
        </div>
        <div style={{ width: 200, height: 200 }}>
        <GrowthChartPos normalValue={newPinsGrowth} absoluteValue={newPinsGrowthAbs}/>
        </div>
    */} 
        <div className="admin-stat">
            <div className="admin-stat-chart">
                <UserChart/>
            </div>
            <div className="admin-stat-right">
                <div className="admin-stat-all">
                    <h2 className="all-upper">All Users</h2>
                    <h1 className="all-lower">{allUsers}</h1>
                </div>
                <div className="admin-stat-growth">
                    {newUsersGrowth >= 0 ? (
                        <GrowthChartPos normalValue={newUsersGrowth} absoluteValue={newUsersGrowthAbs}/>
                    ) : <GrowthChartNeg normalValue={newUsersGrowth} absoluteValue={newUsersGrowthAbs}/>}
                    
                </div>
            </div>
        </div>
       

        <div className="admin-stat">
            <div className="admin-stat-chart">
                <PinChart/>
            </div>
            <div className="admin-stat-right">
                <div className="admin-stat-all">
                    <h2 className="all-upper">All Pins</h2>
                    <h1 className="all-lower">{allPins}</h1>
                </div>
                <div className="admin-stat-growth">
                {newPinsGrowth >= 0 ? (
                        <GrowthChartPos normalValue={newPinsGrowth} absoluteValue={newPinsGrowthAbs}/>
                    ) : <GrowthChartNeg normalValue={newPinsGrowth} absoluteValue={newPinsGrowthAbs}/>}
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}
