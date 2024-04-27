import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <img src="../../assets/images/icon-back.svg" alt="" />
    </button>
  );
}
export default BackBtn;
