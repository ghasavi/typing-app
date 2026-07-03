import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getDashboard } from "../services/dashboardService";

import "../styles/dashboard.css";

export default function Dashboard(){

    const [dashboard,setDashboard]=useState(null);

    useEffect(()=>{

        async function load(){

            try{

                const data=await getDashboard();

                setDashboard(data);

            }

            catch(err){

                console.error(err);

            }

        }

        load();

    },[]);

    if(!dashboard){

        return(

            <>
                <Navbar/>

                <h2
                    style={{
                        textAlign:"center",
                        marginTop:"80px"
                    }}
                >
                    Loading Dashboard...
                </h2>
            </>

        );

    }

    return(

        <>

            <Navbar/>

            <div className="dashboard">

                <h1>

                    Dashboard

                </h1>

                <div className="summary-grid">

                    <div className="summary-card">

                        <div className="summary-title">

                            Tests Completed

                        </div>

                        <div className="summary-value">

                            {dashboard.testsCompleted}

                        </div>

                    </div>

                    <div className="summary-card">

                        <div className="summary-title">

                            Best WPM

                        </div>

                        <div className="summary-value">

                            {dashboard.bestWpm}

                        </div>

                    </div>

                    <div className="summary-card">

                        <div className="summary-title">

                            Average WPM

                        </div>

                        <div className="summary-value">

                            {dashboard.averageWpm}

                        </div>

                    </div>

                    <div className="summary-card">

                        <div className="summary-title">

                            Average Accuracy

                        </div>

                        <div className="summary-value">

                            {dashboard.averageAccuracy}%

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}