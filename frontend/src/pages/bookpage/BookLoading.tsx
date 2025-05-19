import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mainpage from "../../assets/images/mainpage/mainpage.webp";
import Bear from "../../assets/images/loading/bear.webp"
import Rabbit from "../../assets/images/loading/rabbit.webp"
import Cat2 from "../../assets/images/loading/cat2.webp"
import Monkey from "../../assets/images/loading/monkey.webp"
import Note1 from "../../assets/images/loading/note1.webp"
import Note2 from "../../assets/images/loading/note2.webp" 
import Note3 from "../../assets/images/loading/note3.webp"

const BookLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/booklist");
    }, 4000); 

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${mainpage})` }}>
      
      <div className="flex justify-center gap-28 tablet2560:mt-28 mt-12">
        <img src={Note1} alt="Note1" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite1" />
        <img src={Note2} alt="Note2" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite2" />
        <img src={Note3} alt="Note3" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite3" />
        <img src={Note1} alt="Note1" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite1" />
        <img src={Note2} alt="Note2" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite2" />
        <img src={Note3} alt="Note3" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite3" />
      </div>
      <div className="mt-4">
        <h1 className="text-[8vh] tablet2560:text-[10vh] font-bazzi text-outline-sm text-center">동화책을 가져오는 데 5~10분이 걸려요</h1>
        <h1 className="text-[8vh] tablet2560:text-[10vh] font-bazzi text-outline-sm text-center">준비되면 알림을 보내줄게요!</h1>
      </div>
      <div className="fixed tablet2560:bottom-12 left-0 w-full flex justify-center gap-8 bottom-6">
        <img src={Rabbit} alt="Cat1" className=" w-[20vw] max-w-[1200px] min-w-[100px] self-start animate-shake1" />
        <img src={Bear} alt="Bear" className=" w-[25vw] h-[25vw] max-w-[1200px] min-w-[100px] self-end animate-shake2" />
        <img src={Cat2} alt="Cat2" className=" w-[17vw] h-[23vw] max-w-[1200px] min-w-[100px] self-start animate-shake1" />
        <img src={Monkey} alt="Monkey" className=" w-[20vw] h-[24vw] max-w-[1200px] min-w-[100px] self-end animate-shake2" />
      </div>
    </div>
  );
};

export default BookLoading;
