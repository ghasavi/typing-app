import { useEffect, useRef } from "react";
import { useTyping } from "../context/TypingContext";

export default function TypingArea() {

    const {

        typedText,

        setTypedText,

        paragraph,

        isTyping,

        setIsTyping,

        isFinished,

        timeLeft

    } = useTyping();

    const inputRef = useRef(null);

    useEffect(() => {

        inputRef.current.focus();

    }, []);

    function handleChange(e) {

        if (timeLeft <= 0) return;

        if (isFinished) return;

        if (!isTyping) {

            setIsTyping(true);

        }

        if (e.target.value.length > paragraph.length) {

            return;

        }

        setTypedText(e.target.value);

    }

    return (

        <input

            ref={inputRef}

            autoFocus

            value={typedText}

            onChange={handleChange}

            style={{

                position: "absolute",

                opacity: 0,

                width: 0,

                height: 0,

                pointerEvents: "none"

            }}

        />

    );

}