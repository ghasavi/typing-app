import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/profileService";

export default function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await getProfile();

                setProfile(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadProfile();

    }, []);

    if (!profile) {

        return (
            <>
                <Navbar />
                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "50px"
                    }}
                >
                    Loading...
                </h2>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "500px",
                    margin: "40px auto",
                    padding: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "10px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center"
                    }}
                >
                    My Profile
                </h1>

                <hr />

                <h3>

                    Username :
                    {" "}
                    {profile.username}

                </h3>

                <h3>

                    Tests Completed :
                    {" "}
                    {profile.testsCompleted}

                </h3>

                <h3>

                    Best WPM :
                    {" "}
                    {profile.bestWpm}

                </h3>

                <h3>

                    Average Accuracy :
                    {" "}
                    {profile.averageAccuracy}%

                </h3>

            </div>

        </>

    );

}