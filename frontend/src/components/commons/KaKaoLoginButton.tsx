import { useCallback } from "react";
import KaKaoLogin from "../../assets/images/loginpage/kakologin.webp";

function KakaoLoginButton() {
  const handleKakaoLogin = useCallback(() => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = "https://k12b202.p.ssafy.io/auth";

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  }, []);

  return (
    <div className="absolute bottom-[20vh] w-full flex justify-center">
      <button onClick={handleKakaoLogin}>
        <img src={KaKaoLogin} alt="카카오로그인" className="w-[35vw] tablet2560:w-[40vw]" />
      </button>
    </div>
  );
}

export default KakaoLoginButton;
