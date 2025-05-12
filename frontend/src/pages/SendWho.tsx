import { useNavigate, useLocation } from "react-router-dom";
import { useBookCharacter } from "../hooks/useBookCharacter";
import selectbackground from "../assets/images/writeletter/selectbackground.webp";
import BackButton from "../components/commons/BackButton";

function SendWho() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.state?.bookId;

  const { data, isLoading, isError } = useBookCharacter(bookId);

  if (!bookId) return <div className="text-white">동화책을 불러오지 못했어요.</div>;
  if (isLoading) return <div className="text-white">불러오는 중...</div>;
  if (isError || !data) return <div className="text-white">캐릭터를 불러오지 못했어요.</div>;

  const characters = data.data.character;

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${selectbackground})` }}
    >
      <BackButton to="/bookend" />
      <div className="flex justify-center h-screen gap-28 mt-28">
        {characters.map((char) => (
          <button
            key={char.character_id}
            onClick={() => navigate("/writeletter", { state: { characterId: char.character_id, bookId } })}
            className="text-[8vh] font-bazzi text-outline-sm text-center"
          >
            {char.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SendWho;
