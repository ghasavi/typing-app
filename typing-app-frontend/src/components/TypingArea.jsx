import { useEffect, useRef } from "react";
import { useTyping } from "../context/TypingContext";

export default function TypingArea() {

    const {

        typedText,
        setTypedText,

        paragraph,

        isTyping,
        setIsTyping,

        timeLeft

    } = useTyping();

    const inputRef = useRef(null);

    useEffect(() => {

        inputRef.current.focus();

    }, []);

    function handleChange(e) {

        if (timeLeft === 0) return;

        if (typedText.length >= paragraph.length) return;

        if (!isTyping) {

            setIsTyping(true);

        }

        setTypedText(e.target.value);

    }

    return (

        <input

            ref={inputRef}

            value={typedText}

            onChange={handleChange}

            autoFocus

            style={{

                position: "absolute",

                opacity: 0,

                pointerEvents: "none"

            }}

        />

    );

}