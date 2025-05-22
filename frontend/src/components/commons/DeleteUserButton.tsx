import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";
import SweetBear from "../../assets/images/settingpage/sweets_bear.webp"

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
        className="fixed right-[3vw] top-[4vh] flex flex-col items-center 
        transition-transform hover:scale-110 active:scale-105"
      >
        <img 
          src={SweetBear} 
          alt="Sweet Bear" 
          className="w-[9vh] object-contain"
        />
        <span className="font-bazzi text-[2.5vh] mt-1">
          회원탈퇴
        </span>
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
