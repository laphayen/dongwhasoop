import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateChildProfile } from "../../hooks/useCreateChildProfile";
import mainpage from "../../assets/images/mainpage/mainpage.webp";
import BackButton from "../../components/commons/BackButton";
import Child from "../../assets/images/settingpage/child.webp";
import CheckBox from "../../assets/images/settingpage/checkbox.webp";
import TreeBox from "../../assets/images/settingpage/treebox.webp";
import choiceCharacter from "../../assets/images/settingpage/choicecharacter.webp";
import chik from "../../assets/images/settingpage/chik.webp";
import cat from "../../assets/images/settingpage/cat.webp";
import dog from "../../assets/images/settingpage/dog.webp";
import panda from "../../assets/images/settingpage/panda.webp";
import bear from "../../assets/images/settingpage/bear.webp";
import Modal from "../../components/commons/Modal";

function AddingProfile() {
  const navigate = useNavigate();
  const [showCharacters, setShowCharacters] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [childName, setChildName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createChild } = useCreateChildProfile();

  // 현재 선택된 캐릭터의 이미지를 반환하는 함수
  const getCurrentCharacter = () => {
    switch (selectedCharacter) {
      case "cat":
        return cat;
      case "dog":
        return dog;
      case "bear":
        return bear;
      case "chik":
        return chik;
      case "panda":
        return panda;
      default:
        return choiceCharacter;
    }
  };

  const mascotIdMap: Record<string, number> = {
    cat: 1,
    dog: 2,
    bear: 3,
    chik: 4,
    panda: 5,
  };

  const handleSave = async () => {
    if (!childName || !selectedCharacter) {
      setIsModalOpen(true);
      return;
    }

    const mascotId = mascotIdMap[selectedCharacter];

    createChild(
      {
        name: childName,
        mascotId: mascotId,
      },
      {
        onSuccess: () => {
          navigate("/profile");
        },
        onError: (error) => {
          console.error("자녀 등록 실패", error);
          setIsModalOpen(true);
        },
      }
    );
  };

  return (
    <div
      className="relative inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        showCancelButton={false}
        type="setting"
      />

      <div className="">
        {/* 나무 안내판 */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <img
            src={TreeBox}
            alt="나무안내판"
            className="
            w-[35vw]
        xl:w-[30vw] xl:max-w-[900px] h-auto
        tablet2560:w-[35vw] tablet2560:max-w-[900px]
        "
          />

          {/* 캐릭터 선택 */}
          <div className="absolute flex flex-col items-center mt-[10vh]">
            <button onClick={() => setShowCharacters(true)}>
              <img
                src={getCurrentCharacter()}
                alt="캐릭터 선택"
                className="
                w-[20vw] max-w-[600px]  h-auto 
              xl:w-[22vw] xl:max-w-[900px]
              tablet2560:w-[26vw] tablet2560:max-w-[900px]
              "
              />
            </button>
          </div>

          {/* 이름 입력 */}
          <div className="absolute xl:mt-[60vh] tablet2560:mt-[35vw] mt-[35vw]">
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="
              w-[23vw] max-w-[600px] h-[6vw]  placeholder-black
            rounded-full px-8 py-6
            text-center bg-[#fff4d3b8] font-maplestory
            xl:w-[90vw] xl:max-w-[320px] xl:h-[5vw] xl:text-2xl
            tablet2560:w-[90vw] tablet2560:max-w-[550px] tablet2560:text-5xl
            "
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="absolute ml-[70vw] mt-[30vh]">
          <button onClick={handleSave}>
            <img src={CheckBox} alt="저장하기" className="w-[20vw] max-w-[600px]" />
          </button>
        </div>
      </div>

      {/* 캐릭터 선택 모달 */}
      {showCharacters && (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-[999]">
          <div className="w-[80vw] h-[80vh] p-8 flex flex-col items-center justify-center rounded-3xl">
            <h2 className="text-[10vh] text-outline-sm font-bazzi pb-8">캐릭터를 선택해주세요</h2>
            <div className="grid grid-cols-3 gap-20 place-items-center">
              {[
                { id: "cat", img: cat },
                { id: "dog", img: dog },
                { id: "bear", img: bear },
                { id: "chik", img: chik },
                { id: "panda", img: panda },
              ].map(({ id, img }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedCharacter(id);
                    setShowCharacters(false);
                  }}
                  className="hover:scale-110 transition-transform"
                >
                  <img src={img} alt={id} className="w-[20vh] h-[20vh] rounded-full" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 아이 이미지 */}
      <div className="absolute bottom-0 left-[5vw]">
        <img
          src={Child}
          alt="아이 이미지"
          className="
          w-[25vw]
          xl:w-[25vw] xl:max-w-[800px]
          tablet2560:w-[28vw] tablet2560:max-w-[800px]
        "
        />
      </div>
    </div>
  );
}

export default AddingProfile;
