import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookintrobackground from "../../assets/images/bookintro/bookintrobackground.webp";
import kidbook from "../../assets/images/bookintro/kidbook.webp";

const BookLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/booklist");
    }, 4000); 

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <div className="text-[9vh] font-bazzi text-outline-sm text-center xl:mt-24 tablet2560:mt-[10vh]">
        <h1 className="">동화책을 가져오는 데 5~10분이 걸려요</h1>
        <h1 className="">동화책이 준비되면 알림을 보내줄게요!</h1>
      </div>

      <div className="flex justify-center items-center mt-[4vw] relative animate-bounce-infinite3 "></div>

      <div className="flex justify-center items-center">
        <img src={kidbook} alt="kidbook" className="w-[45vh] tablet2560:w-[28vw] animate-fly" />
      </div>
    </div>
  );
};

export default BookLoading;
