import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import RecentTests from "../components/RecentTests";
import "../styles/dashboard.css";

import DashboardChart from "../components/DashboardChart";

import {

    getDashboard,

    getDashboardHistory

} from "../services/dashboardService";

export default function Dashboard(){

    const [recentTests,setRecentTests]=useState([]);

    const [dashboard,setDashboard]=useState(null);

    const [history,setHistory]=useState([]);
    useEffect(()=>{

        async function load(){

            try{

                const summary=await getDashboard();

                const results=await getDashboardHistory();

                setDashboard(summary);

                const chartData=results

                    .reverse()

                    .map((result,index)=>({

                        test:index+1,

                        wpm:result.wpm

                    }));

                setHistory(chartData);
                setRecentTests(results);

            }

            catch(error){

                console.error(error);

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
                <div
                    className="section"
                >

                    <DashboardChart

                        data={history}

                    />

                </div>

                <RecentTests

                    results={recentTests}

                />



            </div>

        </>

    );

}