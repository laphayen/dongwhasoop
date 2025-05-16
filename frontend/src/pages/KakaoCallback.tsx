// KakaoCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIsRegistered } from "../api/authApi";
import { useLogin } from "../hooks/useLogin";
import { useDeleteUser } from "../hooks/useDeleteUser"; 

function KakaoCallback() {
  const navigate = useNavigate();
  const { mutate: loginUser } = useLogin();
  const deleteUserMutation = useDeleteUser();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      alert("인가 코드가 없습니다.");
      navigate("/");
      return;
    }

    const isWithdrawFlow = sessionStorage.getItem("withdraw_flow");
    
    if (isWithdrawFlow) {
      handleWithdraw(code);
    } else {
      localStorage.setItem("authCode", code);
      handleRegisterCheck(code);
    }
  }, []);

  const handleWithdraw = async (code: string) => {
    deleteUserMutation.mutate(code, {
      onSuccess: () => {
        sessionStorage.removeItem("withdraw_flow");
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
      },
      onError: () => {
        sessionStorage.removeItem("withdraw_flow");
        alert("회원탈퇴 실패, 관리자에게 문의하세요.");
        navigate("/settings");
      },
    });
  };

  const handleRegisterCheck = async (code: string) => {
    try {
      const { isRegistered, idToken } = await CheckIsRegistered(code);

      console.log("isRegistered: ", isRegistered);
      console.log("idToken: ", idToken);

      if (isRegistered) {
        loginUser(idToken, {
          onSuccess: () => {
            navigate("/profile");
          },
          onError: () => {
            alert("로그인 실패");
            navigate("/");
          },
        });
      } else {
        navigate("/startsettings", {
          state: {
            idToken,
            provider: "KAKAO",
          },
        });
      }
    } catch (error) {
      console.error("로그인 흐름 중 오류", error);
      alert("로그인 실패");
      navigate("/");
    }
  };

  return <div className="text-center mt-[30vh] text-2xl text-black">로그인 처리 중입니다...</div>;
}

export default KakaoCallback;
