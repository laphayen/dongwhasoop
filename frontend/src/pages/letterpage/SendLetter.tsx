import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import mainpage from "../../assets/images/mainpage/mainpage.webp";
import LetterBird from "../../assets/images/writeletter/letterbird.webp";
import sendingSound from "../../assets/music/sending_sound.mp3";

function SendLetter() {
  const navigate = useNavigate();
  useEffect(() => {
    const audio = new Audio(sendingSound);
    audio.volume = 0.3; 
    audio.play();

    const timer = setTimeout(() => {
      navigate("/home");
    }, 3500);

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <div className="text-[10vh] font-bazzi text-outline-sm text-center xl:mt-[7vh]">
        <h1 className="">편지를 전달하고 있어요~</h1>
        <h1 className="">답장이 도착하면 알려줄게요!</h1>
      </div>

      <div className="absolute w-full xl:top-[40%]">
        <img
          src={LetterBird}
          alt="새 이미지"
          className="
            xl:w-[27vw] xl:max-w-[600px] 
            tablet2560:w-[35vw] tablet2560:max-w-[900px] tablet2560:top-1/3
            h-auto object-contain drop-shadow-2xl animate-fly-right
          "
        />
      </div>
    </div>
  );
}

export default SendLetter;
