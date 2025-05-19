import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import { useGetUserVoice } from "../../hooks/useVoice/useGetUserVoice";
import { usePostUserVoice } from "../../hooks/useVoice/usePostUserVoice";
import { useDeleteUserVoice } from "../../hooks/useVoice/useDeleteUserVoice";
import useVoiceStore from "../../stores/useVoiceStore";
import storyData from "../../assets/storyex/story.json";

import mainpage from "../../assets/images/mainpage/mainpage.webp";
import BackButton from "../../components/commons/BackButton";
import ReadChild from "../../assets/images/settingpage/readchild.webp";
import SittingChild from "../../assets/images/settingpage/sittingchild.webp";
import SubmitRec from "../../assets/images/settingpage/submitrec.webp";
import RecStory from "../../assets/images/settingpage/recstory.webp";
import Endvoicerec from "../../assets/images/settingpage/endvoicerec.webp";
import Listen from "../../assets/images/settingpage/listen.webp";
import RightButton from "../../assets/buttons/rightbutton.webp";
import LeftButton from "../../assets/buttons/leftbutton.webp";
import btnSound from "../../assets/music/btn_sound.mp3";

function VoiceRec() {
  const navigate = useNavigate();
  const location = useLocation();
  const gender = location.state?.gender === "MALE";

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = storyData.story.length;

  const postVoiceMutation = usePostUserVoice();
  const deleteVoiceMutation = useDeleteUserVoice();
  const voices = useVoiceStore((state) => state.voices);
  const setVoices = useVoiceStore((state) => state.setVoices);
  const { data: voiceData } = useGetUserVoice();

  // 서버에서 가져온 목소리 데이터를 store에 저장
  useEffect(() => {
    if (voiceData?.data.voices) {
      setVoices(voiceData.data.voices);
    }
  }, [voiceData, setVoices]);

  const handleRecord = async () => {
    new Audio(btnSound).play();
    if (isRecording) {
      // Stop recording
      recorderRef.current?.stopRecording(() => {
        const blob = recorderRef.current?.getBlob();
        if (blob) {
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }
        // Stop and clean up the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      });
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        const recorder = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/wav",
          desiredSampRate: 16000,
          numberOfAudioChannels: 1,
        });

        recorderRef.current = recorder;
        recorder.startRecording();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const handlePlayback = () => {
    new Audio(btnSound).play();
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };

  const handleSubmit = async () => {
    new Audio(btnSound).play();
    if (!audioBlob) return;

    const file = new File([audioBlob], "voice.wav", { type: "audio/wav" });

    try {
      // 같은 성별의 목소리가 있는지 확인
      const existingVoice = voices.find((voice) => voice.gender === gender);
      // 같은 성별의 목소리가 있다면 먼저 삭제
      if (existingVoice) {
        await deleteVoiceMutation.mutateAsync({
          gender: gender,
        });
      }
      // 새로운 목소리 등록
      const result = await postVoiceMutation.mutateAsync({
        voiceFile: file,
        gender: gender,
      });

      // mutation이 성공적으로 완료된 후에만 navigate
      if (result.success) {
        // base64 변환하여 localStorage 저장
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(",")[1];
          if (!base64data) return;

          localStorage.setItem(
            "voice",
            JSON.stringify({
              data: base64data,
              format: "wav",
              gender: gender ? "MALE" : "FEMALE",
            })
          );
          localStorage.setItem("voiceRecorded", "true");

          navigate("/recsuccess");
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("음성 등록 실패:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioUrl]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainpage})` }}
    >
      <BackButton />

      <div className="xl:pt-[1vw] tablet2560:pt-[4vw]">
        {/* Title */}
        <h1 className="text-[6vh] font-bazzi text-center text-outline-ss mt-8">
          아래 대본을 모두 읽어주세요
        </h1>

        <div className="relative flex items-center justify-center mt-8">
          <button
            className="hover:scale-105 transition-transform"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            <img
              src={LeftButton}
              alt="이전"
              className={`w-[8vw] ${currentPage === 0 ? "opacity-50" : ""}`}
            />
          </button>

          <div className="w-[65vw] h-[40vh] bg-white/80 rounded-3xl mx-8 p-8 overflow-y-auto">
            <p className="text-[8vh] font-bazzi whitespace-pre-line text-center">
              {storyData.story[currentPage]}
            </p>
          </div>

          <button
            className="hover:scale-105 transition-transform"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <img
              src={RightButton}
              alt="다음"
              className={`w-[8vw] ${
                currentPage === totalPages - 1 ? "opacity-50" : ""
              }`}
            />
          </button>
        </div>

        {/* 녹음 버튼들*/}
        <div className="flex justify-center items-center gap-10 mt-[2vw] relative z-10">
          <button
            className="hover:scale-105 transition-transform"
            onClick={handleRecord}
          >
            <img
              src={isRecording ? Endvoicerec : RecStory}
              alt={isRecording ? "녹음종료" : "녹음하기"}
              className="w-[18vw]"
            />
          </button>

          {audioBlob && !isRecording && (
            <>
              <button
                className="hover:scale-105 transition-transform"
                onClick={handlePlayback}
              >
                <img src={Listen} alt="녹음 듣기" className="w-[18vw]" />
              </button>
              <audio ref={audioRef} src={audioUrl || ""} />
            </>
          )}
          <button
            className="hover:scale-105 transition-transform"
            onClick={handleSubmit}
            disabled={isRecording || !audioBlob}
          >
            <img
              src={SubmitRec}
              alt="등록하기"
              className={`w-[18vw] ${
                isRecording || !audioBlob ? "opacity-50" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 아이들 배경 이미지 */}
      <div className="absolute bottom-4 w-full flex justify-between items-end px-[5vw] z-[5]">
        <img src={SittingChild} alt="앉아있는아이" className="w-[15vw]" />
        <img src={ReadChild} alt="읽고있는아이" className="w-[17vw]" />
      </div>
    </div>
  );
}

export default VoiceRec;
