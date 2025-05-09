import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { ScaleLoader } from "react-spinners";

import booklistbackground from "../assets/images/BookList/booklistbackground.webp";
import BackButton from "../components/commons/BackButton";
import GoBack from "../assets/images/BookList/goback.webp";
import GoFront from "../assets/images/BookList/gofront.webp";

import { useBookStore } from "../stores/bookStore";
import { useGetBookList } from "../hooks/useGetBookList";

function BookList() {
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, setSelectedBook, setTotalBooks } = useBookStore();
  const { data, isLoading } = useGetBookList();

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

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);  // page -> currentPage
  };

  const handleNext = () => {
    if (!data?.last) setCurrentPage(currentPage + 1);  // page -> currentPage
  };

  const books = data?.content || [];

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${booklistbackground})` }}
    >
      <BackButton to="/home" />

      {/* 책 리스트 */}
      <div className="relative flex flex-col justify-center items-center min-h-[70vh] z-10">
        <div className="grid grid-cols-3 gap-y-[2vh] gap-x-[5vw] talblet2560:gap-x-[5vw] mt-[4vh] tablet2560:mt-[11vh]">
          {books.map((book) => (
            <div
              key={book.bookId}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setSelectedBook(book);  // 선택한 책 정보 저장
                navigate(`/intro/${book.bookId}`);
              }}
            >
              <img
                src={book.imageUrl || '/default-book-cover.png'} // Add a default image
                alt={book.title}
                className="w-[14vw] talblet2560:w[25vw] max-w-[343px] rounded-xl border-4 border-white shadow-md"
              />

              <h3 className="mt-2 text-[4.5vh] font-bazzi text-[#384EA6] text-outline-xs text-center">{book.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 이전 버튼 */}
      {currentPage > 0 && (  // page -> currentPage
        <button onClick={handlePrev} className="absolute top-1/2 left-[5vw] -translate-y-1/2 z-20">
          <img src={GoBack} alt="이전" className="w-[10vw] max-w-[300px]" />
        </button>
      )}

      {/* 다음 버튼 */}
      {!data?.last && (
        <button onClick={handleNext} className="absolute top-1/2 right-[5vw] -translate-y-1/2 z-20">
          <img src={GoFront} alt="다음" className="w-[10vw] max-w-[300px]" />
        </button>
      )}
    </div>
  );
}

export default BookList;
