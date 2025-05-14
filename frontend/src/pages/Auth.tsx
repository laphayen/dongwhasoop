import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Auth() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const idToken = searchParams.get("idToken");
    const isRegistered = searchParams.get("isRegistered");

    if (!idToken) {
      alert("로그인에 실패했습니다. idToken이 없습니다.");
      navigate("/");
      return;
    }

    // ✅ 백엔드 login API 호출
    loginMutation.mutate(idToken, {
      onSuccess: () => {
        // 로그인 API 응답 저장은 useLogin 안에서 처리 중
        if (isRegistered === "false") {
          navigate("/startsettings");
        } else {
          navigate("/home");
        }
      },
      onError: () => {
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/");
      },
    });
  }, [navigate, loginMutation]);

  return <div className="text-white text-center mt-[30vh] text-3xl">로그인 처리 중입니다...</div>;
}

export default Auth;
