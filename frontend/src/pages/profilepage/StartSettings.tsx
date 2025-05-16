import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { useLocation } from "react-router-dom";
import mainpage from "../../assets/images/mainpage/mainpage.webp";
import AddChild from "../../assets/images/settingpage/addchild.webp"; //애들 추가 완료
import VoiceRecIcon from "../../assets/images/settingpage/voicerec.webp"; //목소리 녹음 완료
import YetAddChild from "../../assets/images/settingpage/yetaddchild.webp"; //애들 추가 미완료
import YetVoiceRecIcon from "../../assets/images/settingpage/yetvoicerec.webp"; //목소리 녹음 미완료
import Next from "../../assets/images/settingpage/next.webp";
import btnSound from "../../assets/music/btn_sound.mp3";
import axios from "axios"; // Add this import at the top
import { useSelectedChild } from "../../stores/useSelectedChild";

// 주의: 모든 정보가 등록된 후에 '등록하기' 버튼이 떠야한다, 녹음이 완료되거나 자녀 정보를 등록하면 이미지가 바뀌어야 함.

function StartSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const idTokenFromLocation = location.state?.idToken;
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken") || idTokenFromLocation);
  const { mutate: registerUser } = useRegisterUser(idToken || "");

  const [isVoiceRecorded, setIsVoiceRecorded] = useState(false);
  const [isChildAdded, setIsChildAdded] = useState(false);

  useEffect(() => {
    const voiceStatus = localStorage.getItem("voiceRecorded");
    const childStatus = localStorage.getItem("childRegistered");

    if (voiceStatus === "true") setIsVoiceRecorded(true);
    if (childStatus === "true") setIsChildAdded(true);
  }, []);

  useEffect(() => {
    if (idTokenFromLocation) {
      localStorage.setItem("idToken", idTokenFromLocation);
      setIdToken(idTokenFromLocation);
    }
  }, [idTokenFromLocation]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <h1 className="text-[8vh] font-bazzi text-black-600 text-center text-outline-sm mt-[6vw] tablet2560:mt-[11vw]">
        부모님의 목소리와 자녀 정보를 등록해주세요.
      </h1>

      {/* 목소리 녹음 버튼 */}
      <div className="flex justify-center items-center gap-[10vh] tablet2560:gap-8 mt-20 ms-[25vh] tablet2560:ms-[18vh] ">
        <button
          onClick={() => {
            new Audio(btnSound).play();
            navigate("/recinfo");
          }}
          className="hover:scale-110 transition-transform"
        >
          <img
            // 녹음 안되어 있으면 노란색 버튼(파일 이름은 반대로 돼있음)
            src={isVoiceRecorded ? YetVoiceRecIcon : VoiceRecIcon}
            alt="목소리 녹음"
            className="w-[25vw] tablet2560:w-[30vw]"
          />
        </button>

        {/* 자녀 등록 버튼 */}
        <button
          onClick={() => {
            new Audio(btnSound).play();
            navigate("/kidsettings");
          }}
          className="hover:scale-110 transition-transform"
        >
          <img src={isChildAdded ? YetAddChild : AddChild} alt="자녀추가" className="w-[25vw] tablet2560:w-[30vw]" />
        </button>

        {/* 등록하기 버튼 (둘 다 완료되어야 활성화) */}
        {isVoiceRecorded && isChildAdded && (
          <button
            onClick={() => {
              const children = JSON.parse(localStorage.getItem("child") || "{}");
              const voice = JSON.parse(localStorage.getItem("voice") || "{}");
              const currentIdToken = localStorage.getItem("idToken");

              if (!currentIdToken) {
                console.error("No idToken found");
                alert("인증 정보가 없습니다. 다시 로그인해주세요.");
                return;
              }

              // 데이터 구조 검증
              if (!children.name || !children.mascotId) {
                console.error("Invalid child data:", children);
                alert("자녀 정보가 올바르지 않습니다.");
                return;
              }

              if (!voice.data || !voice.format || !voice.gender) {
                console.error("Invalid voice data:", voice);
                alert("음성 정보가 올바르지 않습니다.");
                return;
              }

              const payload = {
                children: children,
                voice: {
                  data: voice.data,
                  format: voice.format,
                  isMale: voice.gender === "MALE", // ✅ 반드시 이 변환 필요!
                },
              };

              console.log("Payload structure:", payload); // 자세한 로깅
              console.log("ID Token:", idToken);
              console.log("📦 JSON.stringify payload:", JSON.stringify(payload, null, 2));

              registerUser(payload, {
                onSuccess: () => {
                  // 등록한 자녀를 선택한 자녀로 설정
                  const { setSelectedChild } = useSelectedChild();
                  setSelectedChild({
                    childId: 0, // 
                    childName: children.name,
                    mascotId: children.mascotId
                  });

                  alert("회원가입 완료!");
                  navigate("/home");
                },
                onError: (error) => {
                  if (axios.isAxiosError(error)) {
                    // Type guard for Axios error
                    console.error("회원가입 실패:", error.response?.data);
                  } else {
                    console.error("회원가입 실패:", error);
                  }
                  alert("회원가입 실패");
                },
              });
            }}
          >
            <img src={Next} alt="등록 하기" className="w-[23vh] tablet2560:w-[13vw]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default StartSettings;
