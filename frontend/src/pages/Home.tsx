import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"; 

import HomeBackground from "../assets/images/mainpage/homebackground.webp";
import Book from "../assets/images/mainpage/book.webp";
import MailBox from "../assets/images/mainpage/mailbox.webp";
import MusicOff from "../assets/images/mainpage/musicoff.webp";
import MusicOn from "../assets/images/mainpage/musicon.webp";
import bear from "../assets/images/settingpage/bear.webp";
import cat from "../assets/images/settingpage/cat.webp";
import dog from "../assets/images/settingpage/dog.webp";
import chik from "../assets/images/settingpage/chik.webp";
import panda from "../assets/images/settingpage/panda.webp";
import { useSelectedChild } from "../stores/useSelectedChild";
import { useMusicStore } from "../stores/musicStore";
import btnSound from "../assets/music/btn_sound.mp3";

function Home() {
  const navigate = useNavigate();
  const { isPlaying, togglePlay } = useMusicStore();
  const { selectedChild } = useSelectedChild();
  const [buttonAudio] = useState(new Audio(btnSound));

  // 현재 필요한 마스코트 이미지만 선택
  const currentMascot = useMemo(() => {
    switch (selectedChild?.mascotId) {
      case 2: return dog;
      case 3: return bear;
      case 4: return chik;
      case 5: return panda;
      default: return cat;
    }
  }, [selectedChild?.mascotId]);

  // 필수 이미지만 사전 로딩
  useEffect(() => {
    const criticalImages = [HomeBackground, Book, MailBox];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.loading = 'eager'; // 우선순위 높게 설정
      img.src = src;
    });
  }, []);

  const handleButtonClick = (path: string) => {
    buttonAudio.currentTime = 0;
    buttonAudio.play();
    navigate(path);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeBackground})` }}
    >
      {selectedChild && (
        <div className="absolute top-[5vh] left-[5vh] flex flex-col items-center">
          <button onClick={() => handleButtonClick("/profile")}>
            <img
              src={currentMascot}
              alt="프로필"
              className="w-[12vw] max-w-[2000px] min-w-[60px]"
            />
          </button>
          <p className="text-[7vh] font-bazzi text-outline-sm">{selectedChild.childName}</p>
        </div>
      )}

      {/* 중앙 이미지 버튼들 */}
      <div className="flex justify-center items-center h-full gap-[7vw] mt-[15vh]">
        {/* 동화 문구, 이미지 */}
        <div className="mb-[20vh]">
          {/* 동화 */}
          <h1 className="text-[17vh] font-bazzi text-red-600 text-outline text-center">동화</h1>

          {/* 동화 이미지 */}
          <button onClick={() => handleButtonClick("/booklist")}>
            <img src={Book} alt="동화" className="w-[30vw] max-w-[1200px] min-w-[100px]" />
          </button>
        </div>

        {/* 우편함 문구, 이미지 */}
        <div className="mb-[20vh]">
          {/* 우편함 문구 */}
          <h1 className="text-[17vh] font-bazzi text-yellow-500 text-outline text-center">우편함</h1>

          {/* 우편함 이미지 */}
          <button onClick={() => handleButtonClick("/letterlist")}>
            <img src={MailBox} alt="우편함" className="w-[28vw] max-w-[1200px] min-w-[100px]" />
          </button>
        </div>

        {/* 음악 토글 버튼 */}
        <button onClick={togglePlay} className="fixed bottom-[5vh] right-[5vh]">
          <img
            src={isPlaying ? MusicOff : MusicOn}
            alt="음악 설정"
            className="w-[16vw] max-w-[1000px] min-w-[70px]"
          />
        </button>
      </div>
    </div>
  );
}

export default Home;
