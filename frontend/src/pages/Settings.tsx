import { useNavigate } from "react-router-dom";
import { useState } from "react";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import BackButton from "../components/commons/BackButton";
import ChildAddEdit from "../assets/images/settingpage/childaddedit.webp";
import OnQuestion from "../assets/images/settingpage/onquestion.webp";
import OffQuestion from "../assets/images/settingpage/offquestion.webp";
import VoiceRec from "../assets/images/settingpage/voicerec.webp";

function Settings() {
  const navigate = useNavigate();
  const [isQuestionOn, setIsQuestionOn] = useState(true);

  const handleQuestionToggle = () => {
    setIsQuestionOn(!isQuestionOn);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to="/profile"></BackButton>

      {/* 녹음, 자녀, 질문 버튼*/}
      <div className="relative z-[10] flex justify-center items-center gap-[0vw] mt-[25vh]">
        {/* 녹음 버튼 */}
        <div className="mb-[5vh]">
          <button onClick={() => navigate("/recinfo")}>
            <img src={VoiceRec} alt="녹음하기" className="w-[25vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>

        {/* 자녀 관리 버튼 */}
        <div className="mb-[5vh]">
          <button onClick={() => navigate("/editprofile")}>
            <img src={ChildAddEdit} alt="자녀추가등록" className="w-[25vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>

        {/* 질문 켜기 */}
        <div className="mb-[5vh]">
          <button onClick={handleQuestionToggle}>
            <img
              src={isQuestionOn ? OffQuestion : OnQuestion}
              alt={isQuestionOn ? "질문끄기" : "질문켜기"}
              className="w-[25vw] max-w-[700px] min-w-[100px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
