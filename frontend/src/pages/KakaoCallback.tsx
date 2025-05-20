// KakaoCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIsRegistered } from "../api/authApi";
import { useLogin } from "../hooks/useLogin";
import { useDeleteUser } from "../hooks/useDeleteUser";

import MainBG from "../assets/images/mainpage/mainpage.webp";

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

    // console.log("카카오 콜백 확인:", {
    //   code: code,
    //   withdraw_flow: isWithdrawFlow,
    //   fullUrl: window.location.href,
    // });

    if (isWithdrawFlow) {
      // console.log("회원탈퇴 플로우 진행");
      handleWithdraw(code);
    } else {
      // console.log("일반 로그인 플로우 진행");
      localStorage.setItem("authCode", code);
      handleRegisterCheck(code);
    }
  }, []);

  const handleWithdraw = async (code: string) => {
    // console.log("회원탈퇴 요청 전:", {
    //   code: code,
    //   withdraw_flow: sessionStorage.getItem("withdraw_flow"),
    // });

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

      // console.log("isRegistered: ", isRegistered);
      // console.log("idToken: ", idToken);

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
      // console.error("로그인 흐름 중 오류", error);
      alert("로그인 실패");
      navigate("/");
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${MainBG})` }}
    ></div>
  );
}

export default KakaoCallback;
