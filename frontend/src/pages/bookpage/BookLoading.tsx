import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookintrobackground from "../../assets/images/bookintro/bookintrobackground.webp";
import kidbook from "../../assets/images/bookintro/kidbook.webp";

const BookLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 8000); // 8초 후 실행

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <div className="text-[9vh] font-bazzi text-outline-sm text-center xl:mt-24">
        <h1 className="">동화숲에서 동화를 가져오고 있어요.</h1>
        <h1 className="">5~10분 정도 걸리니 기다려 주세요!</h1>
      </div>

      <div className="flex justify-center items-center mt-[4vw] relative animate-bounce-infinite3 "></div>

      <div className="flex justify-center items-center">
        <img src={kidbook} alt="kidbook" className="w-[20vw] animate-fly" />
      </div>
    </div>
  );
};

export default BookLoading;
