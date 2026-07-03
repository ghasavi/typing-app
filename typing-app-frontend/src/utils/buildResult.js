export function buildResult({
                                wpm,
                                accuracy,
                                time,
                                difficulty,
                                typedText,
                                paragraph
                            }) {

    let correct = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === paragraph[i]) {
            correct++;
        }

    }

    const incorrect = typedText.length - correct;

    return {

        wpm,

        accuracy,

        time,

        difficulty,

        charactersTyped: typedText.length,

        correctCharacters: correct,

        incorrectCharacters: incorrect

    };

}