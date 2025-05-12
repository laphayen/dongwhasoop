import { useNavigate, useLocation } from "react-router-dom";

import endpagebackground from "../assets/images/endpage/endpagebackground.webp";
// import Home from "../assets/images/endpage/home.webp";
import Letter from "../assets/images/endpage/letter.webp";
import Song from "../assets/images/endpage/song.webp";
import Bear from "../assets/images/endpage/bear.webp";
import Monkey from "../assets/images/endpage/monkey.webp";
import GoBookList from "../assets/images/endpage/gobooklist.webp";
import ReplayBook from "../assets/images/endpage/replaybook.webp";
// import HomeButton from "../components/commons/HomeButton";

function BookEnd() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${endpagebackground})` }}
    >
      {/* <HomeButton></HomeButton> */}
      {/* 제목 */}
      <div className="mt-[15vh]">
        <h1 className="text-[10vh] font-bazzi text-black-600 text-center text-outline-sm">
          다음 이야기에서도 함께 해요!
        </h1>
      </div>

      {/* 홈, 편지, 동요 버튼*/}
      <div className="relative z-[10] flex justify-center items-center h-full gap-[0vw]">
        <div className="mb-[45vh]">
          <button onClick={() => navigate("/booklist")}>
            <img src={GoBookList} alt="도서관으로가기" className="w-[20vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
        <div className="mb-[45vh]">
          <button onClick={() => navigate(`/bookdetail/${id}`, { state: { bookId: id } })}>
            <img src={ReplayBook} alt="다시보기" className="w-[20vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
        <div className="mb-[45vh]">
          <button onClick={() => navigate("/sendwho", { state: { bookId: id } })}>
            <img src={Letter} alt="편지쓰기" className="w-[20vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
        <div className="mb-[45vh]">
          <button>
            <img src={Song} alt="동요듣기" className="w-[20vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
      </div>

      {/* 원숭이, 곰 이미지 */}
      <div className="absolute bottom-[2vh] w-full flex justify-center gap-[60vw]">
        <img src={Monkey} alt="원숭이" className="w-[20vw] max-w-[400px]" />
        <img src={Bear} alt="곰" className="w-[20vw] max-w-[400px]" />
      </div>
    </div>
  );
}

export default BookEnd;
