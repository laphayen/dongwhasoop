import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import writeletterbackground from "../assets/images/writeletter/writeletterback.webp";
import record from "../assets/images/writeletter/record.webp";
import send from "../assets/images/writeletter/send.webp";
import BackButton from "../components/commons/BackButton";
import Modal from "../components/commons/Modal";

function WriteLetter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { characterId, bookId } = location.state || {};

  // 음성 녹음 상태 관리
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleRecord = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
    } else {
      SpeechRecognition.stopListening();
    }
    setIsListening(!isListening);
  };

  const handleSendClick = () => {
    console.log("편지 대상:", { characterId, bookId });
    console.log("녹음한 텍스트:", transcript);
    setIsModalOpen(true);
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${writeletterbackground})` }}
    >
      <BackButton to="/sendwho" state={{ bookId }} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate("/sendletter")}
        type="send"
      />

      {/* 녹음 보이스 텍스트 변환 */}
      <div className="absolute bg-white/80 rounded-xl p-4 w-[40vw] text-2xl font-maplestory">
        <p>{transcript || "보내고 싶은 편지 내용을 녹음해주세요."}</p>
      </div>

      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 px-16">
        {/* 녹음 버튼 */}
        <button onClick={handleRecord}>
          <img src={record} alt="record" className="w-[20vw] max-w-[1200px] min-w-[100px]" />
        </button>

        {/* 편지 보내기 */}
        <button onClick={handleSendClick}>
          <img src={send} alt="send" className="w-[20vw] max-w-[1200px] min-w-[100px]" />
        </button>
      </div>
    </div>
  );
}

export default WriteLetter;
