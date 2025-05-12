import { useNavigate, useLocation } from "react-router-dom";
import { useBookCharacter } from "../hooks/useBookCharacter";
import selectbackground from "../assets/images/writeletter/selectbackground.webp";
import BackButton from "../components/commons/BackButton";
import { useBookStore } from "../stores/bookStore";
import backSound from "../assets/music/back_sound.mp3";


function SendWho() {
  const navigate = useNavigate();
  const { selectedBook } = useBookStore();
  const bookId = selectedBook?.bookId;

  const query = useBookCharacter(bookId!);

  if (!bookId) return <div className="text-white">동화책을 불러오지 못했어요.</div>;

  const { data, isLoading, isError } = query;

  if (isLoading) return <div className="text-white">불러오는 중...</div>;
  if (isError || !data) return <div className="text-white">캐릭터를 불러오지 못했어요.</div>;

  const characters = data.data.character;

  const handleBack = () => {
      new Audio(backSound).play();
      navigate("/bookend");
    };

    return (
      <div
        className="fixed inset-0 w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${selectbackground})` }}
      >
        <BackButton onClick={handleBack} />

      {/* 동화책 주인공 */}
      <div className="relative z-[10] flex justify-center items-center gap-[10vw] mt-[35vh]">
        {characters.map((char) => (
          <div key={char.character_id} className="flex flex-col items-center">
            <img
              src={char.image_url}
              alt={char.name}
              onClick={() =>
                navigate("/writeletter", {
                  state: { characterId: char.character_id, bookId },
                })
              }
              className="w-[35vh] h-[35vh] cursor-pointer mb-4 rounded-3xl"
            />
            <span className="text-[6vh] font-bazzi text-outline-sm text-center">{char.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SendWho;
