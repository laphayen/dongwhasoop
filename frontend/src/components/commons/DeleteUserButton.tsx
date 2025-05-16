import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../hooks/useDeleteUser";

function DeleteAccountButton() {
  const navigate = useNavigate();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmed) return;

    deleteUserMutation.mutate("DUMMY", {
      onSuccess: () => {
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
      },
      onError: (err) => {
        console.error("회원탈퇴 실패:", err);
        alert("회원탈퇴 중 문제가 발생했습니다.");
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
