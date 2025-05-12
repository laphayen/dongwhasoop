import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import BackButton from "../components/commons/BackButton";
import NextPage from "../assets/images/detailpage/nextpage.webp";
import PrevPage from "../assets/images/detailpage/prevpage.webp";
import RestartBook from "../assets/images/detailpage/restart.webp";
import Modal from "../components/commons/Modal";

// 더미데이터
import shimcheongDetail from "../data/bookDetailDummy";

function BookDetail() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const book = shimcheongDetail;
  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const currentContent = book.pages[currentPage];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BackButton onClick={handleBackClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate(`/intro/${id}`)}
        type="back"
      />

      {/* Background Images Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {book.pages.map((page, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${page.image})` }}
          />
        ))}
      </div>

      {/* Current Page Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[8vh] px-[5vw]">
        <p className="text-[5vh] font-bazzi text-center bg-black/50 p-4 rounded-xl shadow-md max-w-[90vw] text-white">
          {currentContent.text}
        </p>
      </div>

      {/* 페이지 넘김 버튼 */}
      <div className="absolute bottom-[35vh] w-full flex justify-center gap-[70vw] z-[10]">
        {/* 이전 버튼 */}
        {currentPage > 0 ? (
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
            <img src={PrevPage} alt="이전" className="w-[10vw] max-w-[200px]" />
          </button>
        ) : (
          <div className="w-[10vw] max-w-[200px]" />
        )}

        {/* 다음 버튼 */}
        {currentPage < book.pages.length - 1 ? (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            <img src={NextPage} alt="다음" className="w-[10vw] max-w-[200px]" />
          </button>
        ) : (
          <button onClick={() => navigate("/bookend", { state: { id } })}>
            <img src={NextPage} alt="넘어가기" className="w-[10vw] max-w-[200px]" />
          </button>
        )}
      </div>

      {/* 다시보기 버튼 */}
      <div className="absolute z-[10] mt-[5vh] right-[5vh]">
        <button onClick={() => console.log("다시 듣기 기능은 추후 연결 예정입니당~~")}>
          <img src={RestartBook} alt="다시 듣기" className="w-[13vw] h-[18vh]" />
        </button>
      </div>
    </div>
  );
}

export default BookDetail;
