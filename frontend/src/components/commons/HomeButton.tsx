import GoHome from "../../assets/buttons/gohome.webp";
import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/home")} className="absolute z-[10] mt-[5vh] right-[3vw]">
        <img src={GoHome} alt="홈으로가기" className="w-[17vh] h-[20vh]" />
      </button>
    </div>
  );
}

export default HomeButton;
