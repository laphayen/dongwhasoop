import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostBookDetail } from "../../hooks/useBook/usePostBookDetail";
import bookintrobackground from "../../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../../components/commons/BackButton";
import Mother from "../../assets/images/bookintro/mother.webp";
import Father from "../../assets/images/bookintro/father.webp";
import BearVoice from "../../assets/images/bookintro/bearvoice.webp";
import { useGetUserVoice } from "../../hooks/useVoice/useGetUserVoice";
import useVoiceStore from "../../stores/useVoiceStore";
import { useBookStore } from "../../stores/bookStore";
import btnSound from "../../assets/music/btn_sound.mp3";

function IntroBook() {
  // setBookStatus 추가
  const { setBookPages, setBookStatus } = useBookStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetUserVoice();
  const setVoices = useVoiceStore((state) => state.setVoices);
  const voices = useVoiceStore((state) => state.voices);
  const postBookDetail = usePostBookDetail();
  const [ws, setWs] = useState<WebSocket | null>(null);
  // const setBookPages = useBookStore((state) => state.setBookPages);
  const location = useLocation();

  const buttonContainerStyle =
    "flex justify-center items-center h-full gap-x-[5vw] mt-[-15vh]";
  const buttonStyle = "w-[25vw] h-[25vw] flex items-center justify-center";
  const imageStyle = "w-full h-full object-contain";

  useEffect(() => {
    if (data?.success) {
      setVoices(data.data.voices);
    }
  }, [data, setVoices]);

  //웹소켓 연결 부분 post 요청 전에 실행하고 post 보내고 닫음
  const connectWebSocket = () => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log("Connecting WebSocket...");

    const newWs = new WebSocket(
      `wss://k12b202.p.ssafy.io/api/v1/ws/tts-progress?token=${accessToken}`
    );

    newWs.addEventListener("open", () => {});

    newWs.addEventListener("message", (event) => {
      try {
        const raw = JSON.parse(event.data);
        if (!raw?.data) return;

        const { bookId, bookTitle, voiceId, completed } = raw.data;
        console.log("bookId:", bookId, "completed:", completed);

        if (completed) {
          // completed 상태를 store에 저장
          setBookStatus(bookId, 'completed');
          
          if (location.pathname === "/bookloading") {
            navigate(`/bookdetail/${bookId}`, {
              state: { voiceId },
            });
          }
        }
      } catch (err) {
        // console.error("WebSocket 메시지 파싱 오류:", err);
      }
    });

    newWs.addEventListener("close", (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
    });

    return newWs;
  };

  const handleVoiceClick = async (voiceType: string) => {
    const selectedVoice = voices.find((voice) => voice.voiceType === voiceType);
    if (selectedVoice && id) {
      try {
        const socket = connectWebSocket();
        await new Promise((resolve) => {
          socket.addEventListener("open", resolve);
        });

        const result = await postBookDetail.mutateAsync({
          bookId: parseInt(id),
          voiceId: selectedVoice.voiceId,
        });

        console.log("책 생성 요청 결과:", result);

        // POST 응답의 completed 값에 따라 상태 설정
        if (result?.completed) {
          setBookPages(result.pages);
          navigate(`/bookdetail/${id}`, {
            state: { voiceId: selectedVoice.voiceId },
          });
        } else {
          setBookStatus(parseInt(id), 'pending');
          navigate("/bookloading");
        }

        setWs(socket);
      } catch (error) {
        // error handling
      }
    }
};

  useEffect(() => {
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [ws]);

  const hasVoice = (voiceType: string) => {
    return voices.some((voice) => voice.voiceType === voiceType);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <BackButton to={`/intro/${id}`} />
      <h1 className="text-[13vh] font-bazzi text-black-500 text-outline-sm text-center mt-[9vh]">
        어떻게 읽을까요?
      </h1>

      <div className={buttonContainerStyle}>
        {hasVoice("MOM") && (
          <button
            className={buttonStyle}
            onClick={() => {
              new Audio(btnSound).play();
              handleVoiceClick("MOM");
            }}
          >
            <img src={Mother} alt="엄마목소리" className={imageStyle} />
          </button>
        )}
        {hasVoice("DAD") && (
          <button
            className={buttonStyle}
            onClick={() => {
              new Audio(btnSound).play();
              handleVoiceClick("DAD");
            }}
          >
            <img src={Father} alt="아빠목소리" className={imageStyle} />
          </button>
        )}
        {hasVoice("BEAR") && (
          <button
            className={buttonStyle}
            onClick={() => {
              new Audio(btnSound).play();
              handleVoiceClick("BEAR");
            }}
          >
            <img src={BearVoice} alt="곰돌이목소리" className={imageStyle} />
          </button>
        )}
      </div>
    </div>
  );
}

export default IntroBook;
