import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ScaleLoader } from "react-spinners";

import booklistbackground from "../../assets/images/BookList/booklistbackground.webp";
import BackButton from "../../components/commons/BackButton";
import GoBack from "../../assets/images/BookList/goback.webp";
import GoFront from "../../assets/images/BookList/gofront.webp";
import btnSound from "../../assets/music/btn_sound.mp3";

import { useBookStore } from "../../stores/bookStore";
import { useGetBookList } from "../../hooks/useBook/useGetBookList";
import { GetBookListApiResponse } from "../../types/book";

function BookList() {
  const navigate = useNavigate();
  const {
    currentPage,
    setCurrentPage,
    setSelectedBook,
    setTotalBooks,
    bookStatus,
    removeBookStatus,  // 추가
  } = useBookStore();
  const { data, isLoading } = useGetBookList();
  const [loadedImages, setLoadedImages] = useState<{
    [bookId: number]: boolean;
  }>({});

  const handleImageLoad = (bookId: number) => {
    setLoadedImages((prev) => ({ ...prev, [bookId]: true }));
  };

  // 디버깅: bookStatus 상태 확인
  useEffect(() => {
    // console.log("현재 동화 생성 상태:", bookStatus);
  }, [bookStatus]);

  // 컴포넌트 마운트 시 currentPage 초기화
  useEffect(() => {
    setCurrentPage(0);
  }, []);

  // 데이터가 로드되면 store 업데이트
  useEffect(() => {
    if (data?.content) {
      setTotalBooks(data.content);
    }
  }, [data, setTotalBooks]);

  useEffect(() => {
    if (data?.content) {
      data.content.forEach((book) => {
        if (book.imageUrl) {
          const img = new Image();
          img.src = book.imageUrl;
        }
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.content) {
      const nextPageBooks = data.content.slice(
        currentPage + 1,
        currentPage + 4
      );
      nextPageBooks.forEach((book) => {
        if (book.imageUrl) {
          const img = new Image();
          img.src = book.imageUrl;
        }
      });
    }
  }, [currentPage, data]);

  const handlePrev = () => {
    new Audio(btnSound).play();
    if (currentPage > 0) setCurrentPage(currentPage - 1); // page -> currentPage
  };

  const handleNext = () => {
    new Audio(btnSound).play();
    if (!data?.last) setCurrentPage(currentPage + 1); // page -> currentPage
  };

  const books = data?.content || [];

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${booklistbackground})` }}
    >
      <BackButton to="/home" />

      <div className="relative flex flex-col justify-center items-center min-h-[70vh] z-10">
        <div className="grid grid-cols-3 gap-y-[2vh] gap-x-[5vw] tablet2560:gap-x-[5vw] xl:mt-[3vh] lg:mt-[14vh] md:mt-[15vh] sm:mt-[20vh] mt-[25vh] tablet2560:mt-[11vh]">
          {books.map((book: GetBookListApiResponse["data"]["content"][0]) => (
            <div
              key={book.bookId}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setSelectedBook(book);
                // completed 상태일 때만 상태 제거
                if (bookStatus[book.bookId] === 'completed') {
                  removeBookStatus(book.bookId);
                }
                navigate(`/intro/${book.bookId}`);
              }}
            >
              <div className="relative">
                <img
                  src={book.imageUrl || "/default-book-cover.png"}
                  alt={book.title}
                  onLoad={() => handleImageLoad(book.bookId)}
                  className={`transition-opacity duration-500 ease-in ${
                    loadedImages[book.bookId] ? "opacity-100" : "opacity-0"
                  } w-[14vw] talblet2560:w[25vw] max-w-[343px] rounded-xl border-4 border-white shadow-md`}
                />
                {bookStatus[book.bookId] && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 ${
                      bookStatus[book.bookId] === 'completed' ? 'bg-green-600' : 'bg-yellow-500'
                    } rounded-full flex items-center justify-center m-6 border-4`}
                  >
                    <span className="text-white font-bazzi text-[3.5vh]">
                      {bookStatus[book.bookId] === 'completed' ? '생성 완료' : '생성 중'}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="mt-2 text-[4.5vh] font-bazzi text-[#384EA6] text-outline-xs text-center">
                {book.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 이전 버튼 */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-[3vw] -translate-y-1/2 z-20"
        >
          <img src={GoBack} alt="이전" className="w-[10vw] max-w-[300px]" />
        </button>
      )}

      {/* 다음 버튼 */}
      {!data?.last && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-[3vw] -translate-y-1/2 z-20"
        >
          <img src={GoFront} alt="다음" className="w-[10vw] max-w-[300px]" />
        </button>
      )}
    </div>
  );
}

export default BookList;
