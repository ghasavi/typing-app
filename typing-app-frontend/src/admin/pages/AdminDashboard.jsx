import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
    getDashboard,
    getActivity
} from "../services/adminService";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function AdminDashboard(){

    const [stats,setStats]=useState({});
    const [activity,setActivity]=useState([]);

    useEffect(()=>{

        async function load(){

            setStats(await getDashboard());

            setActivity(await getActivity());

        }

        load();

    },[]);

    return(

        <AdminLayout>

            <h1 style={{marginBottom:30}}>
                Dashboard
            </h1>

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(4,1fr)",
                    gap:"20px"
                }}
            >

                <Card title="Users" value={stats.users}/>
                <Card title="Typing Tests" value={stats.tests}/>
                <Card title="Paragraphs" value={stats.paragraphs}/>
                <Card title="Average WPM" value={stats.averageWpm}/>

            </div>

            <div
                style={{
                    marginTop:"40px",
                    background:"#1f2937",
                    padding:"20px",
                    borderRadius:"12px"
                }}
            >

                <h2 style={{marginBottom:"20px"}}>
                    Typing Tests (Last 7 Days)
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart data={activity}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="date"/>

                        <YAxis/>

                        <Tooltip/>

                        <Line

                            type="monotone"

                            dataKey="tests"

                            stroke="#3b82f6"

                            strokeWidth={3}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </AdminLayout>

    );

}

function Card({title,value}){

    return(

        <div

            style={{

                background:"#1f2937",

                borderRadius:"12px",

                padding:"25px",

                color:"white"

            }}

        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

}