import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserVoice } from "../../hooks/useVoice/useGetUserVoice";
import { useChildProfile } from "../../hooks/useChildProfile";
import useVoiceStore from "../../stores/useVoiceStore";

import mainpage from "../../assets/images/mainpage/mainpage.webp";
import RightButton from "../../assets/buttons/rightbutton.webp";
import RecAlert from "../../assets/images/settingpage/recalert.webp";
import btnSound from "../../assets/music/btn_sound.mp3";

// 상황별 내용과 버튼 네비가 달라져야함.
// 1. 녹음 완료 -> 녹음 완료 피드백, startsettings 으로 네비
// 2. 아이 등록 완료 -> 피드백, startsettings 으로 네비
// 3. 모든 정보 등록 완료 -> 피드백, profile으로 네비
// 4. 중요!!! startsettings가 끝나면 더 이상 사용 안함, 그러니 false로 바꾸고 이제 settings페이지로 가게 수정!!!

function RecSuccess() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const voices = useVoiceStore((state) => state.voices);
  const setVoices = useVoiceStore((state) => state.setVoices);
  const { data: voiceData } = useGetUserVoice();
  const { data: childData } = useChildProfile();

  useEffect(() => {
    // Store에 데이터가 없으면 API 데이터로 업데이트
    if (voiceData?.data.voices) {
      setVoices(voiceData.data.voices);
    }

    // 메시지 설정
    setMessage("녹음이 완료되었어요.");
  }, [voiceData, setVoices]);

  const handleNext = () => {
    new Audio(btnSound).play();
    const hasVoice = voices && voices.length > 0;
    const hasChild = childData && childData.length > 0;

    if (!hasVoice || !hasChild) {
      navigate("/startsettings");
    } else {
      navigate("/settings");
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      {/* 경고 안내문 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-[95vw] max-w-[1800px] lg:w-[60vw] md:mt-[3vw]">
        <img src={RecAlert} alt="경고안내문" className="w-full h-auto" />
        <div className="absolute flex flex-col items-center gap-5 w-full mt-8">
          <h1 className="text-[8vh] font-bazzi text-center text-outline-ss mb-4">{message}</h1>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute w-[15vw] max-w-[300px] right-0 mr-[10vh] top-[40vh]">
        <button onClick={handleNext}>
          <img src={RightButton} alt="넘어가기" />
        </button>
      </div>
    </div>
  );
}

export default RecSuccess;
