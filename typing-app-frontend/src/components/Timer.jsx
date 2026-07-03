import { useEffect } from "react";
import { useTyping } from "../context/TypingContext";

export default function Timer() {

    const {

        timeLeft,

        setTimeLeft,

        isTyping,

        isFinished

    } = useTyping();

    useEffect(() => {

        if (!isTyping) return;

        if (isFinished) return;

        if (timeLeft <= 0) return;

        const timer = setInterval(() => {

            setTimeLeft(previous => previous - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [

        isTyping,

        isFinished,

        timeLeft,

        setTimeLeft

    ]);

    return (

        <h2>

            Time Remaining: {timeLeft}s

        </h2>

    );

}