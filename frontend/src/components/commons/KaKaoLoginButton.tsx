import KaKaoLogin from "../../assets/images/loginpage/kakologin.webp";

function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  return (
    <div className="absolute bottom-[20vh] w-full flex justify-center">
      <button onClick={handleKakaoLogin}>
        <img src={KaKaoLogin} alt="카카오로그인" className="w-[35vw] tablet2560:w-[40vw]" />
      </button>
    </div>
  );
}

export default KakaoLoginButton;
