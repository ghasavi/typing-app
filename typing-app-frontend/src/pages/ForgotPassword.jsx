import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    forgotPassword,
    resetPassword
} from "../services/authService";

import {
    notifySuccess,
    notifyError
} from "../utils/toast";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    async function sendOtp() {

        try {

            const msg = await forgotPassword(email);

            notifySuccess(msg);

            setOtpSent(true);

        }

        catch (error) {

            notifyError(

                error.response?.data ||

                "Unable to send OTP."

            );

        }

    }

    async function handleResetPassword() {

        try {

            const msg = await resetPassword(

                email,

                otp,

                newPassword

            );

            notifySuccess(msg);

            navigate("/login");

        }

        catch (error) {

            notifyError(

                error.response?.data ||

                "Password reset failed."

            );

        }

    }

    return (

        <div
            style={{
                width: "350px",
                margin: "80px auto",
                textAlign: "center"
            }}
        >

            <h1>Forgot Password</h1>

            <br />

            <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e) =>

                    setEmail(e.target.value)

                }

            />

            <br /><br />

            {

                !otpSent &&

                <button onClick={sendOtp}>

                    Send OTP

                </button>

            }

            {

                otpSent &&

                <>

                    <input

                        placeholder="OTP"

                        value={otp}

                        onChange={(e)=>

                            setOtp(e.target.value)

                        }

                    />

                    <br /><br />

                    <input

                        type="password"

                        placeholder="New Password"

                        value={newPassword}

                        onChange={(e)=>

                            setNewPassword(e.target.value)

                        }

                    />

                    <br /><br />

                    <button

                        onClick={handleResetPassword}

                    >

                        Reset Password

                    </button>

                </>

            }

        </div>

    );

}