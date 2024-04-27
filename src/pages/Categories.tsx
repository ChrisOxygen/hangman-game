import BackBtn from "../ui/BackBtn";
import { useGameDataDispatch, useGameDataSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import {
  WordOBJ,
  setCategory,
  setCurrentWord,
} from "../features/gameDataSlice";

function Categories() {
  const navigate = useNavigate();
  const categories = useGameDataSelector((state) => state.gameData.categories);
  const dispatch = useGameDataDispatch();

  function handleCategoryClick(categoryTitle: string) {
    Object.entries(categories).forEach(([key, value]) => {
      if (key === categoryTitle) {
        const wordList: WordOBJ[] = value;
        dispatch(setCategory({ categoryTitle, wordList }));
      }
    });
    dispatch(setCurrentWord());

    navigate("/play");
  }
  return (
    <div className="categories-container box-container">
      <div className="tittle-and-btn">
        <BackBtn />
        <img
          src="../../assets/images/Pick-a-Category-img.svg"
          className="categories-page-title"
        />
      </div>
      <ul className="categories-list">
        {Object.keys(categories).map((categoryTitle, index) => (
          <li className="categories-list__item" key={index}>
            <button
              className="category-btn"
              onClick={() => handleCategoryClick(categoryTitle)}
            >
              {categoryTitle.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
