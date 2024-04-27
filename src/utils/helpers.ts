import { WordOBJ } from "../features/gameDataSlice";
import { singleLetterType } from "../features/playData/playDataSlice";

export function getRandomItem(arr: Array<WordOBJ>) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

export function getletterOBJsToDisplay(currentWord: WordOBJ) {
  const lettersArr = currentWord.name.split("").map((item, index) => {
    const isLetter = item === " " ? false : true;

    return { item, isLetter, index };
  });

  const justLettersIndexsArr = lettersArr.reduce(
    (acc: number[], item, index) => {
      if (item.isLetter) {
        acc.push(index);
      }
      return acc;
    },
    []
  );

  function shuffleArray(arr: number[]): number[] {
    const tempArr = [...arr];
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr;
  }

  const shuffledIndexes = shuffleArray(justLettersIndexsArr);

  const indexesToHide =
    shuffledIndexes.length > 8
      ? shuffledIndexes.slice(0, 8)
      : shuffledIndexes.slice(0, shuffledIndexes.length - 1);

  const lettersDisplayArr = lettersArr.map((item, index) => {
    if (indexesToHide.includes(index)) {
      return { ...item, isVisable: false };
    }
    return { ...item, isVisable: true };
  });

  return lettersDisplayArr;
}

export function createAlphabetObjects(): {
  letter: string;
  hasBeenClicked: boolean;
}[] {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  return alphabet.map((letter) => ({ letter, hasBeenClicked: false }));
}

export function getParagraphsArr(listOfletters: singleLetterType[]) {
  const paragraphArr = [];
  let paragraph = [];
  for (let i = 0; i < listOfletters.length; i++) {
    if (listOfletters[i].item === " ") {
      paragraphArr.push(paragraph);
      paragraph = [];
    } else {
      paragraph.push(listOfletters[i]);
    }
  }
  paragraphArr.push(paragraph);
  paragraph = [];
  return paragraphArr;
}
