import { useState } from "react";
import { useNavigate } from "react-router-dom";

import mainpage from "../../assets/images/mainpage/mainpage.webp";
import BackButton from "../../components/commons/BackButton";
import RightButton from "../../assets/buttons/rightbutton.webp";
import RecAlert from "../../assets/images/settingpage/recalert.webp";
import Mother from "../../assets/images/settingpage/mother.webp";
import Father from "../../assets/images/settingpage/father.webp";
import YetMother from "../../assets/images/settingpage/yetmother.webp";
import YetFather from "../../assets/images/settingpage/yetfather.webp";
import Modal from "../../components/commons/Modal";
import btnSound from "../../assets/music/btn_sound.mp3";

function StartSettings() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<"mother" | "father" | null>(null);

  const handleMotherClick = () => {
    setSelectedParent("mother");
  };

  const handleFatherClick = () => {
    setSelectedParent("father");
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton to="/recinfo" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        type="selectvoice"
        showCancelButton={false}
      />

      <div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center w-[95vw] max-w-[1800px] lg:w-[60vw] md:mt-[3vw]">
          <div className="relative w-full">
            <img src={RecAlert} alt="경고안내문" className="w-full h-auto" />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-[7vh] font-bazzi text-center text-outline-ss mt-[11vh]">
                녹음하는 사람은 누구인가요?
              </h1>

              <div className="flex justify-center items-center gap-5 mt-[2vh]">
                <button
                  className="hover:scale-105 transition-transform"
                  onClick={() => {
                    new Audio(btnSound).play();
                    handleMotherClick();
                  }}
                >
                  <img
                    src={selectedParent === "mother" ? Mother : YetMother}
                    alt="엄마"
                    className="xl:w-[20vw] xl:max-w-[400px] tablet2560:w-[25vw] tablet2560:max-w-[600px] w-[25vw] h-auto"
                  />
                </button>
                <button
                  className="hover:scale-105 transition-transform"
                  onClick={() => {
                    new Audio(btnSound).play();
                    handleFatherClick();
                  }}
                >
                  <img
                    src={selectedParent === "father" ? Father : YetFather}
                    alt="아빠"
                    className="xl:w-[20vw] xl:max-w-[400px] tablet2560:w-[25vw] tablet2560:max-w-[600px] w-[25vw] h-auto"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute w-[15vw] max-w-[300px] right-0 mr-[10vh] top-[40vh]">
        <button
          onClick={() => {
            new Audio(btnSound).play();
            if (selectedParent) {
              const accessToken = localStorage.getItem("accessToken");
              if (accessToken) {
                navigate("/voicerec", {
                  state: {
                    gender: selectedParent === "mother" ? "FEMALE" : "MALE",
                  },
                });
              } else {
                navigate("/startvoicerec", {
                  state: {
                    gender: selectedParent === "mother" ? "FEMALE" : "MALE",
                  },
                });
              }
            } else {
              setIsModalOpen(true);
            }
          }}
        >
          <img src={RightButton} alt="넘어가기" />
        </button>
      </div>
    </div>
  );
}

export default StartSettings;
