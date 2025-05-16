import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

function DeleteAccountButton() {
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

    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed right-[3vw] top-[3vh] px-[2vw] py-[1.5vh] text-red-600 border-4 border-red-600 rounded-lg
        text-[2vh] md:text-[2.2vh] lg:text-[2.4vh] font-medium"
      >
        회원탈퇴
      </button>

      {showModal && (
        <DeleteUserModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default DeleteAccountButton;
