import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import mainpage from "../assets/images/mainpage/mainpage.webp";
import AddChild from "../assets/images/settingpage/addchild.webp"; //애들 추가 완료
import VoiceRecIcon from "../assets/images/settingpage/voicerec.webp"; //목소리 녹음 완료
import YetAddChild from "../assets/images/settingpage/yetaddchild.webp"; //애들 추가 미완료
import YetVoiceRecIcon from "../assets/images/settingpage/yetvoicerec.webp"; //목소리 녹음 미완료
import Next from "../assets/images/settingpage/next.webp";
import btnSound from "../assets/music/btn_sound.mp3";

// 주의: 모든 정보가 등록된 후에 '등록하기' 버튼이 떠야한다, 녹음이 완료되거나 자녀 정보를 등록하면 이미지가 바뀌어야 함.

function StartSettings() {
  const navigate = useNavigate();

  const [isVoiceRecorded, setIsVoiceRecorded] = useState(false);
  const [isChildAdded, setIsChildAdded] = useState(false);

  useEffect(() => {
    const voiceStatus = localStorage.getItem("voiceRecorded");
    const childStatus = localStorage.getItem("childRegistered");

    if (voiceStatus === "true") setIsVoiceRecorded(true);
    if (childStatus === "true") setIsChildAdded(true);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1 className="text-[8vh] font-bazzi text-black-600 text-center text-outline-sm mt-[6vw] tablet2560:mt-[11vw]">
        부모님의 목소리와 자녀 정보를 등록해주세요.
      </h1>

      {/* 목소리 녹음 버튼 */}
      <div className="flex justify-center items-center gap-20 mt-20">
        <button onClick={() => {
          new Audio(btnSound).play();
          navigate("/recinfo");
        }} className="hover:scale-110 transition-transform">
          <img
            src={isVoiceRecorded ? VoiceRecIcon : YetVoiceRecIcon}
            alt="목소리 녹음"
            className="w-[25vw] tablet2560:w-[30vw]"
          />
        </button>

        {/* 자녀 등록 버튼 */}
        <button onClick={() => {
          new Audio(btnSound).play();
          navigate("/kidsettings");
        }} className="hover:scale-110 transition-transform">
          <img src={isChildAdded ? AddChild : YetAddChild} alt="자녀추가" className="w-[25vw] tablet2560:w-[30vw]" />
        </button>
      </div>

      {/* 등록하기 버튼 (둘 다 완료되어야 활성화) */}
      {isVoiceRecorded && isChildAdded && (
        <div className="fixed bottom-0 right-0 mb-4 mx-8">
          <button onClick={() => navigate("/home")}>
            <img src={Next} alt="등록하기" className="w-[15vw]" />
          </button>
        </div>
      )}
    </div>
  );
}

export default StartSettings;
