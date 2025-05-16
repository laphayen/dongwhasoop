import deleteBg from "../../assets/images/deleteuser/deleteuserimage.webp";
import deleteNo from "../../assets/images/deleteuser/deleteno.webp";
import deleteYes from "../../assets/images/deleteuser/deleteyes.webp";

interface DeleteUserModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserModal = ({ onConfirm, onCancel }: DeleteUserModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* 모달 콘텐츠 */}
      <div
        className="w-[80vw] h-[100vh] rounded-2xl p-6 bg-cover bg-center flex flex-col justify-end"
        style={{
          backgroundImage: `url(${deleteBg})`,
        }}
      >
        <div className="flex justify-center gap-6 mb-[15vh]">
          <button onClick={onCancel} className="hover:scale-105 transition-transform">
            <img src={deleteNo} alt="아니오" className="w-[25vw] tablet2560:w-[28vw]" />
          </button>
          <button onClick={onConfirm} className="hover:scale-105 transition-transform">
            <img src={deleteYes} alt="예" className="w-[25vw] tablet2560:w-[28vw]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
