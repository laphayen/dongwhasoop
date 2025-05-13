import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import mainpage from "../../assets/images/mainpage/mainpage.webp";
import LetterBird from "../../assets/images/writeletter/letterbird.webp";

function SendLetter() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <div className="text-[10vh] font-bazzi text-outline-sm text-center xl:mt-24">
        <h1 className="">무사히 편지를 전달했어요~</h1>
        <h1 className="">도착까지 3일이 걸려요~</h1>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3">
        <img
          src={LetterBird}
          alt="새 이미지"
          className="
            xl:w-[25vw] xl:max-w-[600px]
            tablet2560:w-[35vw] tablet2560:max-w-[900px]
            h-auto object-contain drop-shadow-2xl animate-fly
          "
        />
      </div>
    </div>
  );
}

export default SendLetter;
