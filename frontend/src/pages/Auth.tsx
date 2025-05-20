import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIsRegistered } from "../api/authApi";
import { useLogin } from "../hooks/useLogin";

function Auth() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const code = searchParams.get("code");

    if (!code) {
      alert("로그인 실패: 인가 코드 없음");
      navigate("/");
      return;
    }

    // ✅ code → idToken + isRegistered 받아오기
    CheckIsRegistered(code)
      .then(({ idToken, isRegistered }) => {
        if (!idToken) {
          alert("로그인 실패: idToken 없음");
          navigate("/");
          return;
        }

        // ✅ 로그인 진행 (토큰 저장 및 상태 관리)
        loginMutation.mutate(idToken, {
          onSuccess: () => {
            if (isRegistered === false) {
              navigate("/startsettings");
            } else {
              navigate("/home");
            }
          },
          onError: () => {
            alert("로그인 처리 중 오류 발생");
            navigate("/");
          },
        });
      })
      .catch((err) => {
        // console.error("code → idToken 요청 실패", err);
        alert("로그인에 실패했습니다.");
        navigate("/");
      });
  }, [navigate, loginMutation]);

  return <div className="text-white text-center mt-[30vh] text-3xl">로그인 처리 중입니다...</div>;
}

export default Auth;
