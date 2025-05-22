import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useVoiceStore from "../../stores/useVoiceStore";

import mainpage from "../../assets/images/mainpage/mainpage.webp";
import BackButton from "../../components/commons/BackButton";
import RightButton from "../../assets/buttons/rightbutton.webp";
import RecAlert from "../../assets/images/settingpage/recalert.webp";
import btnSound from "../../assets/music/btn_sound.mp3";

function RecInfo() {
  const navigate = useNavigate();
  const voices = useVoiceStore((state) => state.voices);
  const hasVoice = voices && voices.length > 1;
  const stext = "text-[6vh] font-bazzi text-center text-outline-xs";

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to={hasVoice ? "/settings" : "/startsettings"} />

      {/* 경고 안내문 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-[95vw] max-w-[1800px] lg:w-[60vw] md:mt-[3vw]">
        <img src={RecAlert} alt="경고안내문" className="w-full h-auto" />
        <div className="absolute flex flex-col items-center gap-5 w-full mt-[10vh]">
          <h1 className="text-[8vh] font-bazzi text-center text-outline-ss mb-4">녹음 주의사항</h1>
          <h1 className={stext}>1. 녹음은 약 5분의 시간이 필요합니다.</h1>
          <h1 className={stext}>2. 조용한 장소에서 녹음해주세요.</h1>
          <h1 className={stext}>
            3. 풍부한 감정과 표현으로 녹음하면
            <br />더 생생한 동화 읽기가 가능합니다.
          </h1>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute w-[15vw] max-w-[300px] right-0 mr-[10vh] top-[40vh]">
        <button
          onClick={() => {
            new Audio(btnSound).play();
            navigate("/voiceselect");
          }}
        >
          <img src={RightButton} alt="넘어가기" />
        </button>
      </div>
    </div>
  );
}

export default RecInfo;
