import { useTyping } from "../context/TypingContext";

export default function TypingBox() {

    const {
        paragraph,
        typedText,
        setTypedText,
        isTyping,
        setIsTyping,
        timeLeft,
        isFinished
    } = useTyping();

    function handleChange(e) {

        if (timeLeft === 0 || isFinished) {
            return;
        }

        let value = e.target.value;

        // Prevent typing past the paragraph
        if (value.length > paragraph.length) {
            value = value.substring(0, paragraph.length);
        }

        if (!isTyping && value.length > 0) {
            setIsTyping(true);
        }

        setTypedText(value);

    }

    return (

        <textarea
            value={typedText}
            onChange={handleChange}
            disabled={timeLeft === 0 || isFinished}
            placeholder="Start typing here..."
            autoFocus
            style={{
                width: "900px",
                height: "180px",
                fontSize: "22px",
                padding: "15px",
                resize: "none",
                borderRadius: "10px",
                outline: "none"
            }}
        />

    );

}