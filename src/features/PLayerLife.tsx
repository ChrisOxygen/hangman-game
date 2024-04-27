import { useEffect, useRef, useState } from "react";

type PlayerLifeProps = {
  userChances: number | null;
  setGameState: (state: "playing" | "gameOver" | "gameWon" | "paused") => void;
  resetPlayState: () => void;
  resetUserChances: () => void;
};

function PlayerLife({
  userChances,
  setGameState,
  resetUserChances,
}: PlayerLifeProps) {
  const [lifePercentage, setLifePercentage] = useState(100);
  const userChancesRef = useRef<null | number>(null);

  useEffect(() => {
    if (userChances && userChancesRef.current === null) {
      userChancesRef.current = userChances;
    }
    if (userChances && userChancesRef.current !== null) {
      if (userChances !== userChancesRef.current) {
        const percentage = (userChances / userChancesRef.current) * 100;
        setLifePercentage(Math.floor(percentage));
      }
    }
  }, [userChances, lifePercentage]);

  useEffect(() => {
    if (userChances === 0) {
      setGameState("gameOver");
      userChancesRef.current = null;
      setLifePercentage(100);
      resetUserChances();
    }
    if (userChances === null) {
      userChancesRef.current = null;
      setLifePercentage(100);
    }
  }, [userChances, setGameState, resetUserChances]);

  if (!userChances) return <div></div>;

  const bgColor =
    lifePercentage > 50 ? "green" : lifePercentage > 20 ? "orange" : "red";

  const style = {
    width: `${lifePercentage}%`,
    backgroundColor: bgColor,
  };
  return (
    <div className="player-life">
      <div className="life">
        <span className="life__progress" style={style}></span>
      </div>
      <img src="../../assets/images/icon-heart.svg" alt="" className="heart" />
    </div>
  );
}
export default PlayerLife;
