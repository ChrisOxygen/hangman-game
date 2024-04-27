type KeyPadProps = {
  alphabetOBJs: Array<{ letter: string; hasBeenClicked: boolean }>;
  onClickAplhabet: (letter: string) => void;
};

type SingleKeyProps = {
  letter: string;
  hasBeenClicked: boolean;
  handleClick: (letter: string) => void;
};

function KeyPad({ alphabetOBJs, onClickAplhabet }: KeyPadProps) {
  return (
    <div className="key-pad-section">
      {alphabetOBJs.map((letter, index) => (
        <SingleKey
          key={index}
          letter={letter.letter}
          hasBeenClicked={letter.hasBeenClicked}
          handleClick={onClickAplhabet}
        />
      ))}
    </div>
  );
}
export default KeyPad;

function SingleKey({ letter, hasBeenClicked, handleClick }: SingleKeyProps) {
  return (
    <button
      className={`single-key ${hasBeenClicked ? "single-key--clicked" : ""}`}
      disabled={hasBeenClicked}
      onClick={() => handleClick(letter)}
    >
      {letter}
    </button>
  );
}
