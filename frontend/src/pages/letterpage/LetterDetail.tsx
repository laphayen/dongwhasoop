import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mainpage from "../../assets/images/mainpage/mainpage.webp";
import letterpaper from "../../assets/images/letterbox/letterpaper1.webp";
// import send from "../assets/images/letterbox/sendletter.webp";
// import receive from "../assets/images/letterbox/receiveletter.webp";
import princess from "../../assets/images/letterbox/princess.webp";
import replay from "../../assets/images/letterbox/replay.webp";
import home from "../../assets/images/letterbox/home.webp";
import BackButton from "../../components/commons/BackButton";
import { useGetLetterDetail } from "../../hooks/useGetLetterDetail";
import { useLetterStore } from "../../stores/letterStore";
import btnSound from "../../assets/music/btn_sound.mp3";

function LetterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetLetterDetail(id || "");
  const { setSelectedLetter } = useLetterStore();

  useEffect(() => {
    if (data) {
      setSelectedLetter(data);
    }
    return () => setSelectedLetter(null);
  }, [data, setSelectedLetter]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>편지를 불러오는데 실패했습니다.</div>;
  if (!data) return null;

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton onClick={() => handleBackButton()} />

      <div className="flex items-center h-full ps-[30vh] tablet2560:ps-[24vh] pt-10 gap-[5vh] md:gap-[15vh] tablet2560:gap-[8vh]">
        {/* 편지 내용 */}
        <div className="relative w-[55vw] xl:w-[50vw] tablet2560:w-[90vh]"> 
          <img src={letterpaper} alt="Letter Paper" className="w-full" />

          <div className="tablet2560:text-[4vh] xl:text-2xl font-maplestory absolute top-[10%] left-[5%] right-[5%] bottom-[10%] flex flex-col">
            {/* 편지 내용 */}
            <div className={`leading-relaxed whitespace-pre-line min-h-[80%] ${
              data.letter_content.length > 160 ? 'text-[3vh]' : ''
            }`}>
              {data.letter_content}
            </div>

            {/* 날짜와 보낸 사람 */}
            <div className={`flex tablet2560:text-[3vh] xl:text-2xl tablet2560:pb-10 font-maplestory justify-end items-center gap-8 mt-[4vh] ${
              data.letter_content.length > 45 ? 'text-[3vh]' : ''
            }`}>
              <div>{new Date(data.created_at).toLocaleDateString()}</div>
              <div className="flex items-center gap-3">
                <span>{data.character_name}</span>
                <img
                  src={data.character_image_url || princess}
                  alt="Character"
                  className="w-[8vh] h-[8vh] rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 다시 듣기 버튼 */}
        <div className="flex flex-col gap-4"> 
          {data.audio_url && <audio id="letterAudio" src={data.audio_url} />}
          {data.audio_url && (
            <div
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => {
                const audioElement = document.getElementById("letterAudio") as HTMLAudioElement;
                audioElement?.play();
              }}
            >
              <img src={replay} alt="Replay" className="w-[30vh] h-[30vh]" />
            </div>
          )}

          {/* 홈으로 가기 버튼 */}
          <div
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => {
              new Audio(btnSound).play();
              navigate("/home");
            }}
          >
            <img src={home} alt="Home" className="w-[30vh] h-[30vh]" />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default LetterDetail;
