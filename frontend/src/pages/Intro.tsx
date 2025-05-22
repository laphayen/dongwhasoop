import { useNavigate, useParams } from "react-router-dom";
import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../components/commons/BackButton";
import Fairytale from "../assets/images/bookintro/bear.webp";
import Song from "../assets/images/bookintro/fairytale.webp";
import { useBookStore } from "../stores/bookStore";
import { useSongStore } from "../stores/songStore";
import btnSound from "../assets/music/btn_sound.mp3";


function Intro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedBook } = useBookStore();
  const { setCurrentSongId } = useSongStore();

  if (!selectedBook || selectedBook.bookId !== Number(id)) {
    return <div className="text-white">책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <BackButton to="/booklist" />

      <h1 className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4vh] sm:text-[6vh] lg:text-[10vh] font-bazzi text-black text-outline-sm text-center mt-[15vh]">
        어떻게 읽을까요?
      </h1>

      <div className="absolute left-1/2 -translate-x-1/2 flex lg:flex-row justify-center items-center h-full gap-[10vh] lg:mt-[10vh]">
        {/* 책 표지 + 제목 */}
        <div className="flex flex-col items-center">
          <img
            src={selectedBook.imageUrl || "/default-book-cover.png"}
            alt="책 표지"
            className="w-[40vw] sm:w-[20vw] lg:w-[20vw] max-w-[700px] rounded-xl border-4 border-white shadow-lg"
          />
          <h2 className="mt-4 text-[4vh] sm:text-[5vh] font-bazzi text-center text-[#4e4e4e] text-outline-sm">
            {selectedBook.title}
          </h2>
        </div>

        {/* 동요, 동화 버튼 */}
        <div className="flex flex-col gap-[4vh] mt-[4vh] lg:mb-[15vh]">
          <button onClick={() => {
            new Audio(btnSound).play();
            navigate(`/introbook/${id}`);
          }}>
            <img src={Fairytale} alt="동화" className="w-[25vw]" />
          </button>

          <button onClick={() => {
            // new Audio(btnSound).play();
            setCurrentSongId(Number(id));
            navigate(`/songdetail/${id}`);
          }}>
            <img src={Song} alt="동요" className="w-[25vw] " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
