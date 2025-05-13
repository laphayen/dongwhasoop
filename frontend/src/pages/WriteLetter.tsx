import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import writeletterbackground from "../assets/images/writeletter/writeletterback.webp";
import endvoicerec from "../assets/images/settingpage/endvoicerec.webp";
import recstory from "../assets/images/settingpage/recstory.webp";
import send from "../assets/images/writeletter/send.webp";
import BackButton from "../components/commons/BackButton";
import Modal from "../components/commons/Modal";
import { useLetterStore } from "../stores/letterStore";
import { useWriteLetter } from "../hooks/useBook/useWriteLetter";
import { useSelectedChild } from "../stores/useSelectedChild";

function WriteLetter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { characterId, bookId } = location.state || {};

  // 음성 녹음 상태 관리
  const [isListening, setIsListening] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const { letterContent, setLetterContent, clearLetterContent } = useLetterStore();
  const { selectedChild } = useSelectedChild();
  const writeLetter = useWriteLetter();

  useEffect(() => {
    setLetterContent(transcript);
  }, [transcript, setLetterContent]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening(); // 페이지 벗어나면 녹음 중지
      resetTranscript();
    };
  }, []);

  const handleRecord = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
    } else {
      SpeechRecognition.stopListening();
      setHasRecorded(true);
    }
    setIsListening(!isListening);
  };

  const handleSendClick = () => {
    if (!hasRecorded) return alert("녹음을 먼저 완료해주세요.");
    console.log("편지 대상:", { characterId, bookId });
    console.log("녹음한 텍스트:", transcript);
    console.log("편지 내용", letterContent);
    setIsModalOpen(true);
  };

  const handleConfirmSend = () => {
    if (!characterId || !selectedChild || !letterContent.trim()) return;
    writeLetter.mutate(
      {
        characterId,
        body: {
          childId: selectedChild.childId,
          content: letterContent,
        },
      },
      {
        onSuccess: () => {
          clearLetterContent();
          navigate("/sendletter");
        },
      }
    );
  };

  const handleBack = () => {
    navigate("/sendwho", { state: { bookId } });
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${writeletterbackground})` }}
    >
      <BackButton onClick={handleBack} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmSend} type="send" />

      {/* 녹음 보이스 텍스트 변환 */}
      <div className="absolute left-[20vw] top-[30vh] bg-white/80 rounded-xl p-4 w-[40vw] tablet2560:w-[40vw] text-[4vh] font-maplestory">
        <p>{letterContent || "보내고 싶은 편지 내용을 녹음해주세요."}</p>
      </div>

      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 px-[2vh] md:px-[4vh] xl:px-[8vh]">
        {/* 녹음 버튼 */}
        <button onClick={handleRecord}>
          <img
            src={isListening ? endvoicerec : recstory}
            alt="record"
            className="w-[20vw] max-w-[1200px] min-w-[100px]"
          />
        </button>

        {/* 편지 보내기 */}
        <button onClick={handleSendClick} disabled={!hasRecorded}>
          <img src={send} alt="send" className="w-[20vw] max-w-[1200px] min-w-[100px] opacity-100" />
        </button>
      </div>
    </div>
  );
}

export default WriteLetter;
