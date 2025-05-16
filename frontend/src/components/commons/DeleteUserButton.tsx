import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

function DeleteAccountButton() {
  const navigate = useNavigate();
  const deleteUserMutation = useDeleteUser();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = () => {
    const code = localStorage.getItem("authCode");
    if (!code) {
      alert("탈퇴를 위한 인증 코드가 없습니다.");
      return;
    }

    deleteUserMutation.mutate(code, {
      onSuccess: () => {
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
      },
      onError: () => {
        alert("회원탈퇴 실패, 관리자에게 문의하세요.");
      },
    });

    setShowModal(false);
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
