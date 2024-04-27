import BackBtn from "../ui/BackBtn";

function Instructions() {
  return (
    <div className="instructions-container box-container">
      <div className="tittle-and-btn">
        <BackBtn />
        <img
          src="../../assets/images/How-to-Play-title.svg"
          className="instructions-page-title"
        />
      </div>
      <ul className="instructions-list">
        <li className="instructions-list__item">
          <span className="number">01</span>
          <span className="instruction-title">Choose a category</span>
          <span className="instruction-description">
            First, choose a word category, like animals or movies. The computer
            then randomly selects a secret word from that topic and shows you
            blanks for each letter of the word.
          </span>
        </li>
        <li className="instructions-list__item">
          <span className="number">02</span>
          <span className="instruction-title">Guess letters</span>
          <span className="instruction-description">
            Take turns guessing letters. The computer fills in the relevant
            blank spaces if your guess is correct. If it’s wrong, you lose some
            health, which empties after eight incorrect guesses.
          </span>
        </li>
        <li className="instructions-list__item">
          <span className="number">03</span>
          <span className="instruction-title">Win or lose</span>
          <span className="instruction-description">
            You win by guessing all the letters in the word before your health
            runs out. If the health bar empties before you guess the word, you
            lose.
          </span>
        </li>
      </ul>
    </div>
  );
}
export default Instructions;
