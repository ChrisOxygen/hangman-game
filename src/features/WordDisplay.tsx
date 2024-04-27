import { ReactNode } from "react";
import { getParagraphsArr } from "../utils/helpers";

type WordLetterProps = {
  children: ReactNode;
  isVisible: boolean;
};

type WordDisplayProps = {
  //   alphabetOBJs: Array<{ letter: string; hasBeenClicked: boolean }>;
  lettersToDisplay: {
    isVisable: boolean;
    item: string;
    isLetter: boolean;
    index: number;
  }[];
};

function WordDisplay({
  lettersToDisplay: lettersToDisplayOBJ,
}: WordDisplayProps) {
  if (!lettersToDisplayOBJ.length) return <div></div>;
  const lettersToDisplay = lettersToDisplayOBJ;

  const wordsArr = getParagraphsArr(lettersToDisplay);

  return (
    <div className="word-display-section">
      {wordsArr.map((word, index) => (
        <Word key={index}>
          {word.map((letter, index) => (
            <WordLetter key={index} isVisible={letter.isVisable}>
              {letter.item}
            </WordLetter>
          ))}
        </Word>
      ))}
    </div>
  );
}
export default WordDisplay;

type WordProps = {
  children: ReactNode;
};

function Word({ children }: WordProps) {
  return <div className="single-word">{children}</div>;
}

function WordLetter({ isVisible, children }: WordLetterProps) {
  if (isVisible) {
    return (
      <span className="word-letter">
        <span>{children}</span>
      </span>
    );
  }
  return <span className="word-letter word-letter--hidden"></span>;
}
