import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import writeletterbackground from "../../assets/images/writeletter/writeletterback.webp";
import endvoicerec from "../../assets/images/settingpage/endvoicerec.webp";
import recstory from "../../assets/images/settingpage/recstory.webp";
import send from "../../assets/images/writeletter/send.webp";
import BackButton from "../../components/commons/BackButton";
import Modal from "../../components/commons/Modal";
import { useLetterStore } from "../../stores/letterStore";
import { useWriteLetter } from "../../hooks/useBook/useWriteLetter";
import { useSelectedChild } from "../../stores/useSelectedChild";
import btnSound from "../../assets/music/btn_sound.mp3";
import { useRef } from "react";

function WriteLetter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { characterId, bookId } = location.state || {};

  // 음성 녹음 상태 관리
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null); // 추가: 스트림 참조

  const { letterContent, setLetterContent, clearLetterContent } = useLetterStore();
  const { selectedChild } = useSelectedChild();
  const writeLetter = useWriteLetter();

  // 음성 텍스트 변환 결과가 변경될 때마다 편지 내용 업데이트 
  useEffect(() => {
    setLetterContent(transcript);
    setTimeout(() => {
      const textContainer = document.querySelector('.letter-content-container');
      if (textContainer) {
        textContainer.scrollTop = textContainer.scrollHeight;
      }
    }, 0);
  }, [transcript, setLetterContent]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      resetTranscript();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop()); // 스트림 정리
      }
    };
  }, []);

  const handleRecord = async () => {
    new Audio(btnSound).play();
    if (isRecording) {
      // 녹음 중지
      mediaRecorderRef.current?.stop(); // MediaRecorder 중지
      SpeechRecognition.stopListening(); // 음성 인식 중지
      SpeechRecognition.abortListening(); // 음성 인식 강제 종료
      setIsRecording(false);
      setIsListening(false);
      setHasRecorded(true);
  
      // 스트림 정리
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop()); // 모든 트랙 정리
        streamRef.current = null; // 스트림 참조 초기화
      }
    } else {
      // 녹음 시작
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream; // 스트림 저장
  
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];
  
        mediaRecorder.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
  
        mediaRecorder.onstop = () => {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop()); // 스트림 정리
            streamRef.current = null; // 스트림 참조 초기화
          }
        };
  
        mediaRecorder.start();
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true, language: "ko-KR" });
        setIsListening(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const handleSendClick = () => {
    new Audio(btnSound).play();
    if (!hasRecorded || !letterContent.trim()) {
      setIsModalOpen(true);
      return;
    }
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={letterContent.trim() ? handleConfirmSend : () => setIsModalOpen(false)}
        type={letterContent.trim() ? "send" : "cannotsend"}
        showCancelButton={!!letterContent.trim()}
      />

      {/* 녹음 보이스 텍스트 변환 */}
      <div className="absolute bg-white/80 rounded-xl p-4 w-[45vw] text-[3.7vh] font-maplestory overflow-y-auto
      left-[18vw] top-[23vh] max-h-[55vh]  
      tablet2560:left-[30vh] tablet2560:top-[30vh] tablet2560:w-[44vw] tablet2560:max-h-[48vh]">
        <p>{letterContent || "녹음하기 버튼을 눌러 편지 내용을 녹음해주세요."}</p>
      </div>

      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 px-[2vh] md:px-[4vh] xl:px-[8vh]">
        {/* 녹음 버튼 */}
        <button onClick={handleRecord}>
          <img
            src={isRecording ? endvoicerec : recstory}
            alt="record"
            className="w-[20vw] max-w-[1200px] min-w-[100px]"
          />
        </button>

        {/* 편지 보내기 */}
        <button onClick={handleSendClick}>
          <img src={send} alt="send" className="w-[20vw] max-w-[1200px] min-w-[100px] opacity-100" />
        </button>
      </div>
    </div>
  );
}

export default WriteLetter;
