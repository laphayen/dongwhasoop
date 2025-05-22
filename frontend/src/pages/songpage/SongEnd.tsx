import { useNavigate } from "react-router-dom";
import { useSongStore } from "../../stores/songStore";
import { useBookStore } from "../../stores/bookStore";

import endpagebackground from "../../assets/images/endpage/endpagebackground.webp";
import Home from "../../assets/images/endpage/home.webp";
import Book from "../../assets/images/endpage/book.webp";
import Bird from "../../assets/images/endpage/bird.webp";
import Frog from "../../assets/images/endpage/frog.webp";
import SongAgain from "../../assets/images/endpage/songagain.webp";
import btnSound from "../../assets/music/btn_sound.mp3";

function SongEnd() {
  const navigate = useNavigate();
  const { currentSongId } = useSongStore();
  const { selectedBook } = useBookStore();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${endpagebackground})` }}
    >
      {/* 제목 */}
      <div className="mt-[15vh]">
        <h1 className="text-[10vh] font-bazzi text-black-600 text-center text-outline-sm">신나게 노래 들었어요!</h1>
      </div>

      {/* 홈, 다시듣기, 동화보기 버튼*/}
      <div className="relative z-[10] flex justify-center items-center h-full gap-[0vw]">
        <div className="mb-[45vh]">
          <button
            onClick={() => {
              new Audio(btnSound).play();
              navigate("/home");
            }}
          >
            <img src={Home} alt="홈버튼" className="w-[24vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
        <div className="mb-[45vh]">
          <button
            onClick={() => {
              new Audio(btnSound).play();
              if (currentSongId) {
                navigate(`/songdetail/${currentSongId}`);
              }
            }}
          >
            <img src={SongAgain} alt="다시듣기" className="w-[25vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
        <div className="mb-[45vh]">
          <button
            onClick={() => {
              new Audio(btnSound).play();
              if (selectedBook?.bookId) {
                navigate(`/introbook/${selectedBook.bookId}`);
              }
            }}
          >
            <img src={Book} alt="동화보기" className="w-[25vw] max-w-[700px] min-w-[100px]" />
          </button>
        </div>
      </div>

      {/* 원숭이, 곰 이미지 */}
      <div className="absolute bottom-[2vh] w-full flex justify-center gap-[60vw]">
        <img src={Bird} alt="새" className="w-[20vw] max-w-[500px]" />
        <img src={Frog} alt="개구리" className="w-[20vw] max-w-[500px]" />
      </div>
    </div>
  );
}

export default SongEnd;
