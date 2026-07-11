import { useEffect, useState } from "react";

import UserLayout from "../components/UserLayout";

import { getProfile } from "../services/profileService";
import { changePassword } from "../services/authService";

import {
    notifyError,
    notifyInfo
} from "../utils/toast";

import { useTyping } from "../context/TypingContext";

export default function Profile() {

    const [profile, setProfile] = useState(null);

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const { refreshTrigger } = useTyping();

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

    }, [refreshTrigger]);

    async function handleChangePassword() {

        if (!currentPassword || !newPassword) {

            notifyInfo("Please fill in both password fields.");

            return;

        }

        try {

            const message = await changePassword(

                currentPassword,

                newPassword

            );

            notifyInfo(message);

            setCurrentPassword("");

            setNewPassword("");

        } catch (error) {

            if (error.response) {

                notifyError(error.response.data);

            } else {

                notifyError("Failed to change password.");

            }

        }

    }

    if (!profile) {

        return (

            <UserLayout>

                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "50px"
                    }}
                >

                    Loading...

                </h2>

            </UserLayout>

        );

    }

    return (

        <UserLayout>

            <div
                style={{
                    width: "600px",
                    margin: "40px auto",
                    padding: "30px",
                    border: "1px solid #ccc",
                    borderRadius: "10px"
                }}
            >

                <h1 style={{ textAlign: "center" }}>

                    My Profile

                </h1>

                <hr />

                <h3>

                    Username: {profile.username}

                </h3>

                <h3>

                    Tests Completed: {profile.testsCompleted}

                </h3>

                <h3>

                    Best WPM: {profile.bestWpm}

                </h3>

                <h3>

                    Average Accuracy: {profile.averageAccuracy}%

                </h3>

                <hr />

                <h2>

                    Change Password

                </h2>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) =>

                        setCurrentPassword(e.target.value)

                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>

                        setNewPassword(e.target.value)

                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                />

                <button
                    onClick={handleChangePassword}
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer"
                    }}
                >

                    Change Password

                </button>

            </div>

        </UserLayout>

    );

}