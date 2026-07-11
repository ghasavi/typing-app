import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import {
    FaUserCircle,
    FaChartLine,
    FaHistory,
    FaSignOutAlt,
    FaUser
} from "react-icons/fa";

export default function Navbar() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const menuRef = useRef();

    const username = localStorage.getItem("username");

    useEffect(() => {

        function close(e){

            if(menuRef.current &&
                !menuRef.current.contains(e.target)){

                setOpen(false);

            }

        }

        window.addEventListener("click", close);

        return () => window.removeEventListener("click", close);

    }, []);

    function logout(){

        localStorage.clear();

        navigate("/login");

    }

    return(

        <nav
            style={{
                position:"fixed",
                top:0,
                left:0,
                right:0,
                height:"70px",
                background:"#1b1b1b",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"0 40px",
                zIndex:1000
            }}
        >

            <div
                style={{
                    fontSize:"25px",
                    color:"#f59e0b",
                    fontWeight:"bold"
                }}
            >
                TypingApp
            </div>

            <div
                style={{
                    display:"flex",
                    gap:"35px"
                }}
            >

                <Link to="/home">Home</Link>

                <Link to="/leaderboard">Leaderboard</Link>

            </div>

            <div
                ref={menuRef}
                style={{
                    position:"relative"
                }}
            >

                <div

                    onClick={() => setOpen(!open)}

                    style={{
                        width:"45px",
                        height:"45px",
                        borderRadius:"50%",
                        background:"#f59e0b",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        color:"white",
                        fontWeight:"bold",
                        cursor:"pointer",
                        fontSize:"20px"
                    }}

                >

                    {username?.charAt(0).toUpperCase()}

                </div>

                {

                    open &&

                    <div
                        style={{
                            position:"absolute",
                            right:0,
                            top:"60px",
                            width:"230px",
                            background:"#252525",
                            borderRadius:"12px",
                            overflow:"hidden",
                            boxShadow:"0 8px 25px rgba(0,0,0,.5)"
                        }}
                    >

                        <div
                            style={{
                                padding:"18px",
                                borderBottom:"1px solid #333"
                            }}
                        >

                            <strong>{username}</strong>

                        </div>

                        <MenuItem
                            icon={<FaUser />}
                            text="Public Profile"
                            click={()=>navigate("/profile")}
                        />

                        <MenuItem
                            icon={<FaChartLine />}
                            text="Statistics"
                            click={()=>navigate("/statistics")}
                        />

                        <MenuItem
                            icon={<FaHistory />}
                            text="History"
                            click={()=>navigate("/history")}
                        />

                        <MenuItem
                            icon={<FaSignOutAlt />}
                            text="Logout"
                            click={logout}
                        />

                    </div>

                }

            </div>

        </nav>

    );

}

function MenuItem({icon,text,click}){

    return(

        <div

            onClick={click}

            style={{
                display:"flex",
                gap:"15px",
                alignItems:"center",
                padding:"15px 18px",
                cursor:"pointer"
            }}

        >

            {icon}

            {text}

        </div>

    );

}