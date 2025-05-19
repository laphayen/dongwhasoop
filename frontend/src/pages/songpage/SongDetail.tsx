import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import BackButton from "../../components/commons/BackButton";
import { useGetSong } from "../../hooks/useBook/useGetSongDetail";
import { useMusicStore } from "../../stores/musicStore";
import mainpage from "../../assets/images/mainpage/mainpage.webp";
import Bear from "../../assets/images/loading/bear.webp"
import Rabbit from "../../assets/images/loading/rabbit.webp"
import Cat2 from "../../assets/images/loading/cat2.webp"
import Monkey from "../../assets/images/loading/monkey.webp"
import Note1 from "../../assets/images/loading/note1.webp"
import Note2 from "../../assets/images/loading/note2.webp"
import Note3 from "../../assets/images/loading/note3.webp"

function SongDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { togglePlay } = useMusicStore(); // Add this line
  const { data: songUrl, isLoading, isError } = useGetSong(Number(id));

  // 마운트시 배경음악 끄기
  useEffect(() => {
    togglePlay(); // 배경음악 끄기
    return () => {
      togglePlay(); // 언마운트시 배경음악 다시 켜기
    };
  }, [togglePlay]);

  useEffect(() => {
    if (songUrl && videoRef.current) {
      videoRef.current.autoplay = true; // autoplay 속성 추가
      videoRef.current.load(); // 비디오 로드
      videoRef.current.play().catch((error) => {
        console.error("Failed to autoplay:", error);
      });
    }
  }, [songUrl]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-2xl font-bazzi">노래를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-2xl font-bazzi text-red-500">노래를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center">
      <BackButton onClick={() => navigate(-1)} />

      {songUrl ? (
        <div className="w-full h-full">
          <video
            ref={videoRef}
            controls
            className="w-full h-full object-cover"
            onEnded={() => navigate("/songend")}
          >
            <source src={songUrl} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      ) : (
        <div className="fixed inset-0 w-screen h-screen bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${mainpage})` }}>
          <div className="flex justify-center gap-[11vh] mt-[12vh]">
            <img src={Note2} alt="Note2" className="w-[14vh] animate-bounce-infinite2" />
            <img src={Note3} alt="Note3" className="w-[14vh] animate-bounce-infinite3" />
            <img src={Note1} alt="Note1" className="w-[14vh] animate-bounce-infinite1" />
            <img src={Note2} alt="Note2" className="w-[14vh] animate-bounce-infinite2" />
            <img src={Note3} alt="Note3" className="w-[14vh] animate-bounce-infinite3" />
          </div>

          <div className="flex items-center justify-center h-screen absolute bottom-[18vh] tablet2560:bottom-[12vh] left-0 w-full">
            <h1 className="text-[10vh] font-bazzi text-outline-sm text-center">아직 동요가 만들어지지 않았어요~</h1>
          </div>

          <div className="fixed bottom-12 left-0 w-full flex justify-center gap-8">
            <img src={Rabbit} alt="Cat1" className=" w-[20vw] max-w-[1200px] min-w-[100px] self-start animate-shake1" />
            <img src={Bear} alt="Bear" className=" w-[25vw] h-[25vw] max-w-[1200px] min-w-[100px] self-end animate-shake2" />
            <img src={Cat2} alt="Cat2" className=" w-[17vw] h-[23vw] max-w-[1200px] min-w-[100px] self-start animate-shake1" />
            <img src={Monkey} alt="Monkey" className=" w-[20vw] h-[24vw] max-w-[1200px] min-w-[100px] self-end animate-shake2" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SongDetail;
