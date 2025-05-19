import deleteBg from "../../assets/images/deleteuser/deleteuserimage.webp";
import deleteNo from "../../assets/images/deleteuser/deleteno.webp";
import deleteYes from "../../assets/images/deleteuser/deleteyes.webp";

interface DeleteUserModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserModal = ({ onCancel }: DeleteUserModalProps) => {
  const handleWithdraw = () => {
    const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    sessionStorage.setItem("withdraw_flow", "true");

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-[80vw] h-[100vh] rounded-2xl p-6 bg-cover bg-center flex flex-col justify-end"
        style={{ backgroundImage: `url(${deleteBg})` }}
      >
        <div className="flex justify-center gap-6 mb-[15vh]">
          <button
            onClick={onCancel}
            className="hover:scale-105 transition-transform"
          >
            <img
              src={deleteNo}
              alt="아니오"
              className="w-[23vw] tablet2560:w-[25vw]"
            />
          </button>
          <button
            onClick={handleWithdraw}
            className="hover:scale-105 transition-transform"
          >
            <img
              src={deleteYes}
              alt="예"
              className="w-w-[23vw] tablet2560:w-[25vw]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
