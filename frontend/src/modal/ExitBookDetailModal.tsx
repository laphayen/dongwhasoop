interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

function ExitBookDetailModal({ onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[80vw] max-w-[500px] text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">정말 목소리 선택 화면으로 돌아갈까요?</h2>
        <div className="flex justify-center gap-6">
          <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            계속 볼래요!
          </button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            나갈래요!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitBookDetailModal;
