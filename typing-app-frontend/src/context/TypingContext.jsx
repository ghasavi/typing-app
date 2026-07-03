import { createContext, useContext, useEffect, useState } from "react";
import { saveResult } from "../services/resultService";

const TypingContext = createContext();

export function TypingProvider({ children }) {

    const TEST_TIME = 60;

    const [paragraph, setParagraph] = useState("");

    const [difficulty, setDifficulty] = useState("easy");

    const [typedText, setTypedText] = useState("");

    const [timeLeft, setTimeLeft] = useState(TEST_TIME);

    const [isTyping, setIsTyping] = useState(false);

    const [isFinished, setIsFinished] = useState(false);

    const [resultSaved, setResultSaved] = useState(false);

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [wpm, setWpm] = useState(0);

    const correctCharacters = typedText
        .split("")
        .filter((char, index) => char === paragraph[index]).length;

    const [accuracy, setAccuracy] = useState(100);

    // ==========================
    // Accuracy
    // ==========================

    useEffect(() => {

        if (typedText.length === 0) {

            setAccuracy(100);
            return;

        }

        setAccuracy(

            Math.round(

                (correctCharacters / typedText.length) * 100

            )

        );

    }, [

        typedText,

        correctCharacters

    ]);

    // ==========================
    // WPM
    // ==========================

    useEffect(() => {

        if (!isTyping) return;

        const elapsedSeconds = TEST_TIME - timeLeft;

        if (elapsedSeconds <= 0) return;

        const minutes = elapsedSeconds / 60;

        const words = correctCharacters / 5;

        setWpm(

            Math.round(

                words / minutes

            )

        );

    }, [

        correctCharacters,

        isTyping,

        timeLeft

    ]);

    // ==========================
    // Finish Test
    // ==========================

    useEffect(() => {

        if (

            paragraph.length > 0 &&

            typedText.length >= paragraph.length &&

            !isFinished

        ) {

            setIsFinished(true);

            setIsTyping(false);

        }

    }, [

        typedText,

        paragraph,

        isFinished

    ]);

    // ==========================
    // Save Result Automatically
    // ==========================

    useEffect(() => {

        async function uploadResult() {

            if (
                resultSaved ||
                wpm <= 0
            ) {
                return;
            }

            try {

                await saveResult({

                    wpm,

                    accuracy,

                    time: TEST_TIME - timeLeft

                });

                setResultSaved(true);

                // Notify all pages to refresh
                setRefreshTrigger(previous => !previous);

                console.log("Result saved successfully.");

            } catch (error) {

                console.error(
                    "Failed to save result",
                    error
                );

            }

        }

        if (isFinished || timeLeft === 0) {

            uploadResult();

        }

    }, [

        isFinished,

        timeLeft,

        wpm,

        accuracy,

        resultSaved

    ]);

    // ==========================
    // Restart Test
    // ==========================

    function resetTest() {

        setTypedText("");

        setTimeLeft(TEST_TIME);

        setIsTyping(false);

        setIsFinished(false);

        setResultSaved(false);

        setAccuracy(100);

        setWpm(0);

    }

    return (

        <TypingContext.Provider

            value={{

                paragraph,
                setParagraph,

                difficulty,
                setDifficulty,

                typedText,
                setTypedText,

                timeLeft,
                setTimeLeft,

                isTyping,
                setIsTyping,

                isFinished,
                setIsFinished,

                accuracy,

                wpm,

                refreshTrigger,

                resetTest

            }}

        >

            {children}

        </TypingContext.Provider>

    );

}

export function useTyping() {

    return useContext(TypingContext);

}