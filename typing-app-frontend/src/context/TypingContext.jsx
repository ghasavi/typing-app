import { createContext, useContext, useEffect, useState } from "react";

const TypingContext = createContext();

export function TypingProvider({ children }) {

    const TEST_TIME = 60;

    const [paragraph, setParagraph] = useState("");
    const [difficulty, setDifficulty] = useState("easy");

    const [typedText, setTypedText] = useState("");

    const [timeLeft, setTimeLeft] = useState(TEST_TIME);

    const [isTyping, setIsTyping] = useState(false);

    const [isFinished, setIsFinished] = useState(false);

    const [cursor, setCursor] = useState(0);

    const [wpm, setWpm] = useState(0);

    const [accuracy, setAccuracy] = useState(100);

    // -----------------------------
    // Accuracy (cursor based)
    // -----------------------------
    useEffect(() => {

        if (typedText.length === 0) {
            setAccuracy(100);
            return;
        }

        let correct = 0;

        for (let i = 0; i < typedText.length; i++) {

            if (typedText[i] === paragraph[i]) {
                correct++;
            }

        }

        setAccuracy(Math.round((correct / typedText.length) * 100));

    }, [typedText, paragraph]);

    // -----------------------------
    // WPM
    // -----------------------------
    useEffect(() => {

        if (!isTyping) return;

        const elapsed = TEST_TIME - timeLeft;

        if (elapsed <= 0) return;

        let correct = 0;

        for (let i = 0; i < typedText.length; i++) {

            if (typedText[i] === paragraph[i]) {
                correct++;
            }

        }

        const words = correct / 5;
        const minutes = elapsed / 60;

        setWpm(Math.round(words / minutes));

    }, [typedText, paragraph, timeLeft, isTyping]);

    // -----------------------------
    // FINISH (IMPORTANT FIX)
    // -----------------------------
    useEffect(() => {

        if (
            paragraph.length > 0 &&
            cursor === paragraph.length &&
            !isFinished
        ) {

            setIsFinished(true);
            setIsTyping(false);

        }

    }, [cursor, paragraph, isFinished]);

    // -----------------------------
    // RESET
    // -----------------------------
    function resetTest() {

        setTypedText("");
        setCursor(0);
        setTimeLeft(TEST_TIME);
        setIsTyping(false);
        setIsFinished(false);
        setAccuracy(100);
        setWpm(0);

    }

    return (

        <TypingContext.Provider value={{

            paragraph,
            setParagraph,

            difficulty,
            setDifficulty,

            typedText,
            setTypedText,

            cursor,
            setCursor,

            timeLeft,
            setTimeLeft,

            isTyping,
            setIsTyping,

            isFinished,

            wpm,
            accuracy,

            resetTest

        }}>

            {children}

        </TypingContext.Provider>

    );

}

export function useTyping() {
    return useContext(TypingContext);
}