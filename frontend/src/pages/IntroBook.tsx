import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import bookintrobackground from "../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../components/commons/BackButton";
import Mother from "../assets/images/bookintro/mother.webp";
import Father from "../assets/images/bookintro/father.webp";
import BearVoice from "../assets/images/bookintro/bearvoice.webp";
import { useGetUserVoice } from "../hooks/useVoice/useGetUserVoice";
import useVoiceStore from "../stores/useVoiceStore";

function IntroBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetUserVoice();
  const setVoices = useVoiceStore((state) => state.setVoices);
  const voices = useVoiceStore((state) => state.voices);

  useEffect(() => {
    if (data?.success) {
      setVoices(data.data.voices);
    }
  }, [data, setVoices]);

  const handleVoiceClick = (voiceType: string) => {
    const selectedVoice = voices.find((voice) => voice.voiceType === voiceType);
    if (selectedVoice) {
      navigate(`/bookdetail/${id}`, { state: { voiceId: selectedVoice.voiceId } });
    }
  };

  const hasVoice = (voiceType: string) => {
    return voices.some((voice) => voice.voiceType === voiceType);
  };

  const buttonContainerStyle = "flex justify-center items-center h-full gap-x-[5vw] mt-[-15vh]";
  const buttonStyle = "w-[25vw] h-[25vw] flex items-center justify-center";
  const imageStyle = "w-full h-full object-contain";

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bookintrobackground})` }}
    >
      <BackButton to={`/intro/${id}`} />
      <h1 className="text-[13vh] font-bazzi text-black-500 text-outline-sm text-center mt-[9vh]">어떻게 읽을까요?</h1>

      <div className={buttonContainerStyle}>
        {hasVoice("MOM") && (
          <button className={buttonStyle} onClick={() => handleVoiceClick("MOM")}>
            <img src={Mother} alt="엄마목소리" className={imageStyle} />
          </button>
        )}
        {hasVoice("DAD") && (
          <button className={buttonStyle} onClick={() => handleVoiceClick("DAD")}>
            <img src={Father} alt="아빠목소리" className={imageStyle} />
          </button>
        )}
        {hasVoice("BEAR") && (
          <button className={buttonStyle} onClick={() => handleVoiceClick("BEAR")}>
            <img src={BearVoice} alt="곰돌이목소리" className={imageStyle} />
          </button>
        )}
      </div>
    </div>
  );
}

export default IntroBook;
