// src/pages/Auth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      alert("로그인 인가 코드가 없습니다.");
      navigate("/");
      return;
    }

    const checkMembershipAndLogin = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/credentials/oauth/valid/register`, {
          params: {
            code,
            provider: "KAKAO",
          },
        });

        const { isMember, idToken } = res.data;

        if (isMember) {
          // 로그인 요청
          const loginRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/credentials/login`, null, {
            params: {
              idToken,
              provider: "KAKAO",
            },
          });

          const accessToken = loginRes.data.accessToken;
          localStorage.setItem("access_token", accessToken);
          navigate("/home");
        } else {
          // 회원가입으로 이동
          navigate("/startsettings", { state: { idToken } });
        }
      } catch (error) {
        console.error("카카오 로그인 처리 중 오류 발생:", error);
        alert("로그인 중 문제가 발생했습니다.");
        navigate("/");
      }
    };

    checkMembershipAndLogin();
  }, [navigate]);

  return <div className="text-white text-center mt-[30vh] text-3xl">로그인 처리 중입니다...</div>;
}

export default Auth;
