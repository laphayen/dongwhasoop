// src/pages/Auth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;

    const accessToken = searchParams.get("access_token");
    const isNewUser = searchParams.get("isNewUser");

    if (!accessToken) {
      alert("로그인에 실패했습니다. access_token이 없습니다.");
      navigate("/");
      return;
    }

    // 1. access_token 저장
    localStorage.setItem("access_token", accessToken);

    // 2. 회원 여부에 따라 분기
    if (isNewUser === "true") {
      navigate("/startsettings"); // 신규 회원이면 설정 페이지로 이동
    } else {
      navigate("/home"); // 기존 회원이면 홈으로 이동
    }
  }, [navigate]);

  return <div className="text-white text-center mt-[30vh] text-3xl">로그인 처리 중입니다...</div>;
}

export default Auth;
