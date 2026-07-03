import { useRef } from "react";
import { useTyping } from "../context/TypingContext";

export default function TypingParagraph() {

    const {

        paragraph,

        typedText

    } = useTyping();

    const inputRef = useRef(null);

    return (

        <div

            onClick={() => {

                const input = document.querySelector("input");

                if (input) input.focus();

            }}

            style={{

                fontSize: "30px",

                lineHeight: "2",

                maxWidth: "950px",

                margin: "0 auto",

                padding: "30px",

                cursor: "text",

                userSelect: "none"

            }}

        >

            {

                paragraph.split("").map((char, index) => {

                    let color = "#6b7280";

                    let background = "transparent";

                    if (index < typedText.length) {

                        if (typedText[index] === char) {

                            color = "#22c55e";

                        }

                        else {

                            color = "#ef4444";

                        }

                    }

                    if (index === typedText.length) {

                        background = "#38bdf8";

                        color = "white";

                    }

                    return (

                        <span

                            key={index}

                            style={{

                                color,

                                background,

                                borderRadius: "3px"

                            }}

                        >

                            {char}

                        </span>

                    );

                })

            }

        </div>

    );

}