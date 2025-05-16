import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../hooks/useDeleteUser";

function DeleteAccountButton() {
  const navigate = useNavigate();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmed) return;

    const code = localStorage.getItem("authCode");
    if (!code) {
      alert("탈퇴를 위한 인증 코드가 없습니다. 다시 로그인 후 시도해주세요.");
      return;
    }

    deleteUserMutation.mutate(code, {
      onSuccess: () => {
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
      },
      onError: () => {
        alert("회원탈퇴 실패. 관리자에게 문의하세요.");
      },
    });
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      회원탈퇴
    </button>
  );
}

export default DeleteAccountButton;
