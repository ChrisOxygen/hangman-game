import { useCallback, useEffect, useRef } from "react";
import KeyPad from "../features/KeyPad";
import PlayerLife from "../features/PLayerLife";
import WordDisplay from "../features/WordDisplay";
import { useGameDataDispatch, useGameDataSelector } from "../hooks";
import { getletterOBJsToDisplay } from "../utils/helpers";
import Modal, { ModalHandle } from "../ui/Modal";
import { useNavigate } from "react-router-dom";
import MenuBtn from "../ui/MenuBtn";
import Button from "../ui/Button";
import {
  getLettersToDisplay,
  resetPlayData,
  setUserChances,
  singleLetterType,
  updateAlphabetOBJs,
  updateGameState,
} from "../features/playData/playDataSlice";
import { resetGameData, setCurrentWord } from "../features/gameDataSlice";

// import uniqid from "uniqid";

function Play() {
  const { currentWord: currentWordFromHook, selectedCategory } =
    useGameDataSelector((state) => state.gameData);

  const { alphabetOBJs, userChances, lettersToDisplay, gameState } =
    useGameDataSelector((state) => state.playData);

  const gameDatadispatch = useGameDataDispatch();

  const navigate = useNavigate();

  const modal = useRef<ModalHandle>(null);

  useEffect(() => {
    if (!currentWordFromHook.name) return navigate("/categories");

    const allLettersinWord = currentWordFromHook.name
      .split("")
      .filter((letter) => letter !== " ")
      .join("");
    const userChances =
      allLettersinWord.length > 8 ? 10 : allLettersinWord.length + 2;

    const lettersToDisplay: singleLetterType[] =
      getletterOBJsToDisplay(currentWordFromHook);

    gameDatadispatch(getLettersToDisplay(lettersToDisplay));
    gameDatadispatch(setUserChances(userChances));
  }, [currentWordFromHook, navigate, gameDatadispatch]);

  useEffect(() => {
    if (Object.keys(lettersToDisplay).length > 0) {
      if (lettersToDisplay.every((letter) => letter.isVisable === true)) {
        gameDatadispatch(updateGameState("gameWon"));
      }
    }
  }, [lettersToDisplay, gameDatadispatch]);

  useEffect(() => {
    if (
      gameState === "paused" ||
      gameState === "gameOver" ||
      gameState === "gameWon"
    ) {
      modal.current?.open();
    }
  }, [gameState]);

  const openMenu = useCallback(() => {
    gameDatadispatch(updateGameState("paused"));
  }, [gameDatadispatch]);

  const closeMenu = () => {
    gameDatadispatch(updateGameState("playing"));
  };

  const resetPlayState = () => {
    gameDatadispatch(resetPlayData());
  };

  function setGameState(
    gameState: "playing" | "gameOver" | "gameWon" | "paused"
  ) {
    gameDatadispatch(updateGameState(gameState));
  }

  const closeModalAndGoToCategoryPage = () => {
    closeMenu();
    resetPlayState();
    gameDatadispatch(resetGameData());
    navigate("/categories");
  };
  const closeModalAndQuitGame = () => {
    closeMenu();
    resetPlayState();
    gameDatadispatch(resetGameData());

    navigate("/");
  };

  function onClickAplhabet(letter: string) {
    const updatedAlphabet = alphabetOBJs.map((alphabetOBJ) => {
      if (alphabetOBJ.letter === letter) {
        return { ...alphabetOBJ, hasBeenClicked: true };
      }
      return alphabetOBJ;
    });
    gameDatadispatch(updateAlphabetOBJs(updatedAlphabet));

    const isCorrect = lettersToDisplay
      .filter(
        (letterToDisplay) =>
          letterToDisplay.isLetter && !letterToDisplay.isVisable
      )
      .some(
        (letterToDisplay) =>
          letterToDisplay.item.toLowerCase() === letter.toLowerCase()
      );

    if (!isCorrect) {
      decrementUserChances();
    }
    if (isCorrect) {
      const updatedLettersToDisplay = lettersToDisplay.map(
        (letterToDisplay) => {
          if (
            letterToDisplay.isLetter &&
            letterToDisplay.item.toLowerCase() === letter.toLowerCase()
          ) {
            return { ...letterToDisplay, isVisable: true };
          }
          return letterToDisplay;
        }
      );
      gameDatadispatch(getLettersToDisplay(updatedLettersToDisplay));
    }
  }

  function decrementUserChances() {
    gameDatadispatch(setUserChances(userChances! - 1));
  }

  function resetUserChances() {
    gameDatadispatch(setUserChances(null));
  }

  const playAgain = () => {
    resetPlayState();
    gameDatadispatch(setCurrentWord());
    closeMenu();
  };

  const gameWonOrLost = gameState === "gameOver" || gameState === "gameWon";

  return (
    <div className="play-container play-box-container">
      <div className="header-section">
        <MenuBtn openMenu={openMenu} />
        <h2 className="category-title">{selectedCategory.categoryTitle}</h2>
        <PlayerLife
          userChances={userChances}
          resetPlayState={resetPlayState}
          setGameState={setGameState}
          resetUserChances={resetUserChances}
        />
      </div>
      <div className="play-body">
        <WordDisplay lettersToDisplay={lettersToDisplay} />
        <KeyPad alphabetOBJs={alphabetOBJs} onClickAplhabet={onClickAplhabet} />
      </div>

      {gameState === "paused" && (
        <Modal ref={modal} onClose={closeMenu}>
          <img
            src="../../assets/images/Paused-text.svg"
            alt=""
            className="modal-img"
          />
          <Button el="button" onClick={closeMenu} className="how-to-play-btn">
            continue
          </Button>
          <Button
            el="button"
            onClick={closeModalAndGoToCategoryPage}
            className="how-to-play-btn"
          >
            new category
          </Button>
          <Button
            el="button"
            onClick={closeModalAndQuitGame}
            className="quit-game-btn"
          >
            quit game
          </Button>
        </Modal>
      )}
      {gameWonOrLost && (
        <Modal ref={modal} onClose={closeMenu}>
          <img
            src={
              gameState === "gameOver"
                ? "../../assets/images/You-Lose-img.svg"
                : "../../assets/images/You-Win-img.svg"
            }
            alt=""
            className="modal-img"
          />
          <Button el="button" onClick={playAgain} className="how-to-play-btn">
            play again
          </Button>
          <Button
            el="button"
            onClick={closeModalAndGoToCategoryPage}
            className="how-to-play-btn"
          >
            new category
          </Button>
          <Button
            el="button"
            onClick={closeModalAndQuitGame}
            className="quit-game-btn"
          >
            quit game
          </Button>
        </Modal>
      )}
    </div>
  );
}

export default Play;
