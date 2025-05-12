import { useNavigate } from "react-router-dom";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import cat from "../assets/images/settingpage/cat.webp";
import dog from "../assets/images/settingpage/dog.webp";
import bear from "../assets/images/settingpage/bear.webp";
import chik from "../assets/images/settingpage/chik.webp";
import panda from "../assets/images/settingpage/panda.webp";
import settingsbtn from "../assets/images/settingpage/settingsbtn.webp";
import treebox from "../assets/images/settingpage/treebox.webp";
import { useState } from "react";
import { useChildProfile } from "../hooks/useChildProfile";
import { useSelectedChild } from "../stores/useSelectedChild";

function Profile() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [answer, setAnswer] = useState("");
  const [num1] = useState(Math.floor(Math.random() * 9) + 1);
  const [num2] = useState(Math.floor(Math.random() * 9) + 1);
  const { setSelectedChild } = useSelectedChild();

  const handleSubmit = () => {
    if (parseInt(answer) === num1 * num2) {
      navigate("/settings");
    } else {
      setAnswer("");
    }
  };

  const handleNumberClick = (num: number) => {
    if (answer.length < 2) {
      const newAnswer = answer + num;
      setAnswer(newAnswer);

      // 입력 즉시 정답 확인
      if (parseInt(newAnswer) === num1 * num2) {
        setTimeout(() => {
          navigate("/settings");
        }, 300);
      } else if (newAnswer.length === 2) {
        // 2자리 입력했는데 오답이면 초기화
        setTimeout(() => {
          setAnswer("");
        }, 300);
      }
    }
  };

  // handleDelete 함수 추가
  const handleDelete = () => {
    setAnswer((prev) => prev.slice(0, -1));
  };

  return (
    <div
      className="font-bazzi fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      {/* 프로필 선택 */}
      <button onClick={() => setShowSettings(true)} className="absolute top-7 right-7 z-10">
        <img src={settingsbtn} alt="설정" className="w-[9vw] max-w-[500px] min-w-[50px] m-[3vh]" />
      </button>

      <div className="flex flex-col pt-16">
        <h1 className="pt-[14vh] text-[9vh] sm:text-[11vh] xl:text-[10vh] text-outline-sm text-center">
          어떤 친구가 오늘의 주인공이 될까요?
        </h1>
        <div className="flex justify-center items-center gap-10 sm:gap-20 xl:gap-40 mt-6 sm:mt-12 xl:mt-20 tablet2560:mt-40">
          {useChildProfile().data?.map((child) => {
            let mascotImg = cat;
            if (child.mascotId === 2) mascotImg = dog;
            if (child.mascotId === 3) mascotImg = bear;
            if (child.mascotId === 4) mascotImg = chik;
            if (child.mascotId === 5) mascotImg = panda;

            return (
              <button
                key={child.childId}
                onClick={() => {
                  setSelectedChild(child);
                  navigate("/home");
                }}
                className="hover:scale-110 transition-transform"
              >
                <img
                  src={mascotImg}
                  alt={child.childName}
                  className="w-[20vh] h-[20vh] sm:w-[25vh] sm:h-[25vh] xl:w-[30vh] xl:h-[30vh] rounded-full bg-[#90EE90]"
                />
                <p className="mt-4 text-[5vh] sm:text-[7vh] xl:text-[8vh] text-outline-sm">{child.childName}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 설정 모달 */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-[999]"
          onClick={() => setShowSettings(false)}
        >
          <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={treebox} alt="나무안내판" className="w-[54vh]" />

            {/* 모달 내용 */}
            <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 w-[40vh]">
              <div className="text-center xl:pb-[3.5vh]">
                <h2 className="text-[6vh] text-outline-xs font-bazzi">보호자이신가요?</h2>
                <p className="text-[3vh] text-black font-bazzi hidden sm:block">정답을 입력해주세요</p>
              </div>

              <div className="flex flex-col font-maplestory items-center gap-[3.8vh]">
                <p className="bg-[#FBE4B9] rounded-3xl p-[2vh] text-[5vh]">
                  {num1} × {num2}
                </p>
                <div className="flex items-center">
                  <div className="flex gap-[2vh]">
                    <div className="relative w-[5vh] tablet2560:w-[5vh]">
                      <div className="text-[3vh] text-center absolute bottom-0 w-full">
                        {answer[0] || "\u00A0"}
                      </div>
                      <div className="border-b-2 tablet2560:border-b-4 border-[#FBE4B9] h-[2vh]" />
                    </div>
                    <div className="relative w-[5vh] tablet2560:w-[5vh]">
                      <div className="text-[3vh] text-center absolute bottom-0 w-full">
                        {answer[1] || "\u00A0"}
                      </div>
                      <div className="border-b-2 tablet2560:border-b-4 border-[#FBE4B9] h-[2vh]" />
                    </div>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="w-[5vh] h-[5vh] bg-[#FBE4B9] rounded-full text-[2.5vh] hover:bg-[#e6dbb0] transition-colors ml-4"
                  >
                    ←
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-[1vh]">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        className="w-[6vh] h-[6vh] bg-[#FBE4B9] rounded-full text-[2.5vh] hover:bg-[#e6dbb0] transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-[1vh]">
                    {[6, 7, 8, 9, 0].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        className="w-[6vh] h-[6vh] bg-[#FBE4B9] rounded-full text-[2.5vh] hover:bg-[#e6dbb0] transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
