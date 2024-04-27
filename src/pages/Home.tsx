import { Link } from "react-router-dom";
import Button from "../ui/Button";

function Home() {
  return (
    <div className="home-container">
      <div className="middle-box">
        <img src="../../assets/images/logo.svg" alt="" className="game-title" />
        <Link to="categories" className="play-game-btn">
          <img src="../../assets/images/icon-play.svg" alt="" />
        </Link>

        <Button el="anchor" to="instructions" className="how-to-play-btn">
          HOW TO PLAY
        </Button>
      </div>
    </div>
  );
}

export default Home;
