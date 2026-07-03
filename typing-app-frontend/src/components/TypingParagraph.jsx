import { useTyping } from "../context/TypingContext";
import "../styles/typing.css";

export default function TypingParagraph() {

    const { paragraph, typedText } = useTyping();

    return (

        <div className="typing-wrapper">

            {paragraph.split("").map((char, index) => {

                let color = "#646669";

                if (index < typedText.length) {

                    color = typedText[index] === char ? "#4caf50" : "#ef4444";

                }

                const isCurrent = index === typedText.length;

                return (

                    <span key={index} style={{ color }}>

                        {char}

                        {isCurrent && <span className="caret"></span>}

                    </span>

                );

            })}

        </div>

    );

}