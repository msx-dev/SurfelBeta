import "./AdminStats.css";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { CalculateGrowth } from "../../functions/Other/CalculateGrowth";
import GrowthChartPos from "../Charts/GrowthCharts/GrowthChartPos";


export default function AdminStats() {

    const [allUsers, setAllUsers] = useState();
    const [allPins, setAllPins] = useState();
    const [pinsMonth, setPinsMonth] = useState([]);
    const [usersMonth, setUsersMonth] = useState([]);
    const [newPinsGrowth, setNewPinsGrowth] = useState();
    const [newUsersGrowth, setNewUsersGrowth] = useState();
    const [newPinsGrowthAbs, setNewPinsGrowthAbs] = useState();
    const [newUsersGrowthAbs, setNewUsersGrowthAbs] = useState();
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
        <GrowthChartPos normalValue={newUsersGrowth} absoluteValue={newUsersGrowthAbs}/>
    </div>
  )
}
