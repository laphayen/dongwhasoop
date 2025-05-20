import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import bookintrobackground from "../../assets/images/bookintro/bookintrobackground.webp";
import BackButton from "../../components/commons/BackButton";
import NextPage from "../../assets/images/detailpage/nextpage.webp";
import PrevPage from "../../assets/images/detailpage/prevpage.webp";
import RestartBook from "../../assets/images/detailpage/restart.webp";
import Modal from "../../components/commons/Modal";
import { useBookStore } from "../../stores/bookStore";
import { useMusicStore } from "../../stores/musicStore";

function BookDetail() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookPages = useBookStore((state) => state.bookPages);
  const bookID = useBookStore((state) => state.selectedBook?.bookId);
  const selectedBook = useBookStore((state) => state.selectedBook);
  const [audio] = useState(new Audio());
  const [isLoading, setIsLoading] = useState(true);

  // 로딩 화면 표시 후 첫 페이지 재생
  useEffect(() => {
    if (selectedBook && bookPages) {
      const timer = setTimeout(() => {
        setIsLoading(false); // 로딩 상태를 false로 변경하여 로딩 화면 종료
        if (bookPages[0]?.audioUrl) {
          audio.src = bookPages[0].audioUrl;
          audio.play().catch((error) => {
            // console.log("Audio playback error:", error);
          });
        }
      }, 3500); 

      return () => clearTimeout(timer);
    }
  }, [selectedBook, bookPages, audio]);

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(0);

  // 데이터가 없으면 인트로 페이지로 리다이렉트
  useEffect(() => {
    if (!bookPages) {
      navigate(`/intro/${bookID}`);
    }
  }, [bookPages, bookID, navigate]);

  // 현재 페이지의 컨텐츠
  const currentContent = bookPages?.[currentPage];

  // 페이지 변경시 자동 재생
  useEffect(() => {
    let isCurrentPage = true;

    const playAudio = async () => {
      if (currentContent?.audioUrl && isCurrentPage && !isLoading) {
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.src = currentContent.audioUrl;
          await audio.play();
        } catch (error) {
          // console.log("Audio playback error:", error);
        }
      }
    };

    playAudio();

    return () => {
      isCurrentPage = false;
      audio.pause();
      audio.currentTime = 0;
    };
  }, [currentPage, currentContent, audio, isLoading]);

  // 다시듣기 버튼도 수정
  const handleReplay = () => {
    if (currentContent?.audioUrl) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  useEffect(() => {
    if (!bookPages) return;

    // 현재 페이지, 다음 페이지, 이전 페이지 미리 로딩
    const preloadTargets = [bookPages[currentPage - 1], bookPages[currentPage], bookPages[currentPage + 1]];

    preloadTargets.forEach((page) => {
      if (page?.imageUrl) {
        const img = new Image();
        img.src = page.imageUrl;
      }
    });
  }, [currentPage, bookPages]);

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bookintrobackground})` }}
      >
        <img
          src={selectedBook?.imageUrl || "/default-book-cover.png"}
          alt="Book Cover"
          className="w-[40vh] max-w-[800px] rounded-xl border-8 border-white shadow-md animate-fade-in-up animate-delay-100"
        />
        <h1 className="mt-[8vh] text-[12vh] font-bazzi text-black text-outline-sm animate-fade-in-up animate-delay-300">
          {selectedBook?.title}
        </h1>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <BackButton onClick={handleBackClick} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => navigate(`/intro/${bookID}`)}
        type="back"
      />

      {/* Background Images Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentPage * 100}%)` }}
      >
        {bookPages?.map((page, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${page.imageUrl})` }}
          />
        ))}
      </div>

      {/* Current Page Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[8vh] px-[5vw]">
        <p className="text-[5vh] font-bazzi text-center bg-black/50 p-4 rounded-xl shadow-md max-w-[90vw] text-white">
          {currentContent?.textContent}
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
        {bookPages && currentPage < bookPages.length - 1 ? (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            <img src={NextPage} alt="다음" className="w-[10vw] max-w-[200px]" />
          </button>
        ) : (
          <button onClick={() => navigate("/bookend", { state: { bookID } })}>
            <img src={NextPage} alt="넘어가기" className="w-[10vw] max-w-[200px]" />
          </button>
        )}
      </div>

      {/* 다시듣기 버튼 */}
      <div className="absolute z-[10] mt-[5vh] right-[5vh]">
        <button onClick={handleReplay}>
          <img src={RestartBook} alt="다시 듣기" className="w-[18vh] tablet2560:w-[11.5vw]" />
        </button>
      </div>
    </div>
  );
}

export default BookDetail;
