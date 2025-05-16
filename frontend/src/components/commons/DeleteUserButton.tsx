import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

function DeleteAccountButton() {
  const navigate = useNavigate();
  const deleteUserMutation = useDeleteUser();
  const [showModal, setShowModal] = useState(false);

  const openKakaoAuthPopup = () => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_POPUP_REDIRECT_URI;
    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const popup = window.open(authUrl, "kakaoPopup", "width=500,height=600");
    return popup;
  };

  const handleConfirmDelete = () => {
    const popup = openKakaoAuthPopup();

    if (!popup) {
      alert("팝업을 허용해주세요.");
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "KAKAO_AUTH_CODE") {
        const code = event.data.code;

        deleteUserMutation.mutate(code, {
          onSuccess: () => {
            alert("회원탈퇴가 완료되었습니다.");
            navigate("/");
          },
          onError: () => {
            alert("회원탈퇴 실패, 관리자에게 문의하세요.");
          },
        });

        window.removeEventListener("message", handleMessage);
        setShowModal(false);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed right-6 top-6 text-red-600 underline text-base hover:text-red-700 bg-transparent border-none text-sm md:text-base lg:text-lg"
      >
        회원탈퇴
      </button>

      {showModal && <DeleteUserModal onConfirm={handleConfirmDelete} onCancel={() => setShowModal(false)} />}
    </>
  );
}

export default DeleteAccountButton;
