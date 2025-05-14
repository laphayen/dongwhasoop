// src/pages/Auth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const idToken = searchParams.get("idToken");
    const isRegistered = searchParams.get("isRegistered");

    if (!idToken) {
      alert("로그인에 실패했습니다. idToken이 없습니다.");
      navigate("/");
      return;
    }

    // ✅ 1. idToken을 저장 (access_token 대신)
    localStorage.setItem("access_token", idToken); // 네 앱에서 access_token처럼 쓰는 용도라면 이름은 그대로 둬도 됨

    // ✅ 2. 등록 여부에 따라 분기
    if (isRegistered === "false") {
      navigate("/startsettings"); // 신규 회원
    } else {
      navigate("/home"); // 기존 회원
    }
  }, [navigate]);

  return <div className="text-white text-center mt-[30vh] text-3xl">로그인 처리 중입니다...</div>;
}

export default Auth;
