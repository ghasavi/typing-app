import { useTyping } from "../context/TypingContext";

export default function TypingBox() {

    const {
        paragraph,
        typedText,
        setTypedText,
        cursor,
        setCursor,
        isTyping,
        setIsTyping,
        timeLeft,
        isFinished
    } = useTyping();

    function handleChange(e) {

        if (timeLeft === 0 || isFinished) return;

        let value = e.target.value;

        if (value.length > paragraph.length) return;

        if (!isTyping && value.length > 0) {
            setIsTyping(true);
        }

        setTypedText(value);
        setCursor(value.length); // 🔥 THIS IS THE KEY FIX

    }

    return (

        <input

            value={typedText}

            onChange={handleChange}

            disabled={timeLeft === 0 || isFinished}

            autoFocus

            style={{

                position: "absolute",
                opacity: 0,
                pointerEvents: "none"

            }}

        />

    );

}