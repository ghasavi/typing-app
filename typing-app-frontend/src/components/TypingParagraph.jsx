import { useTyping } from "../context/TypingContext";

export default function TypingParagraph() {

    const { paragraph, typedText } = useTyping();

    return (

        <div
            onClick={() => document.querySelector("textarea")?.focus()}
            style={{
                fontSize: "28px",
                lineHeight: "2",
                maxWidth: "900px",
                margin: "0 auto",
                padding: "20px",
                minHeight: "180px",
                cursor: "text",
                userSelect: "none",
                wordWrap: "break-word"
            }}
        >

            {paragraph.split("").map((char, index) => {

                let color = "#888";

                if (index < typedText.length) {

                    color =
                        typedText[index] === char
                            ? "#22c55e"
                            : "#ef4444";

                }

                return (

                    <span
                        key={index}
                        style={{
                            color,
                            backgroundColor:
                                index === typedText.length
                                    ? "#3b82f6"
                                    : "transparent",
                            borderRadius: "3px"
                        }}
                    >
                        {char}
                    </span>

                );

            })}

        </div>

    );

}