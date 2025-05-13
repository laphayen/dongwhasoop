import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLetterStore } from "../stores/letterStore";
import { getLetterBookList } from "../api/letter";
import mainpage from "../assets/images/mainpage/mainpage.webp";
import letterlist from "../assets/images/letterbox/letterlist.webp";
import readletter from "../assets/images/letterbox/readletter.webp";
import unreadletter from "../assets/images/letterbox/unreadletter.webp";
import send from "../assets/images/letterbox/sendletter.webp";
import receive from "../assets/images/letterbox/receiveletter.webp";
import picture from "../assets/images/letterbox/picture.webp";
import defaultchar from "../assets/images/letterbox/defaultcharacter.webp";
import arrow from "../assets/images/letterbox/arrow.webp";
import letterpicture from "../assets/images/letterbox/letterpicture.webp";
import BackButton from "../components/commons/BackButton";
import cat from "../assets/images/loading/cat2.webp"
import monkey from "../assets/images/loading/monkey.webp"
import { useGetLetterBookList } from "../hooks/useGetLetterBookList"
import { useGetLetterList } from "../hooks/useGetLetterList"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import btnSound from "../assets/music/btn_sound.mp3";


function LetterList() {
  const navigate = useNavigate();
  const { selectedBookId, setSelectedBook } = useLetterStore();
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
  const [bookPage, setBookPage] = useState(0);
  const BOOKS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const LETTERS_PER_PAGE = 4;
  const handleTabChange = (tab: 'sent' | 'received') => {
    const audio = new Audio(btnSound);
    audio.play();
    setActiveTab(tab);
  };


  // React Query로 데이터 fetching
  const { data: letterBooks, isLoading, error } = useGetLetterBookList();
  const { data: letters } = useGetLetterList(selectedBookId || 0, activeTab === 'sent');


  // 데이터 확인용 로그
  // useEffect(() => {
  //   if (letterBooks?.data?.book) {
  //     console.log("현재 보유한 동화책:", letterBooks.data.book);
  //   }
  // }, [letterBooks]);

  // 탭 변경시 페이지 초기화
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab, selectedBookId]);

  // 편지 목록 페이지네이션
  const getCurrentPageLetters = () => {
    if (!letters?.content) return [];
    const startIndex = currentPage * LETTERS_PER_PAGE;
    return letters.content.slice(startIndex, startIndex + LETTERS_PER_PAGE);
  };

  const currentLetters = getCurrentPageLetters();

  // 화면 크기에 따른 동화책 개수 조정
  const getBooksPerPage = () => {
    if (window.matchMedia('(min-width: 2560px) and (min-height: 1600px)').matches) {
      return 6; // tablet2560 해상도(2560x1600)에서는 6개로 고정
    } else {
      // 현재 컨테이너 높이를 기준으로 동적 계산
      const containerHeight = window.innerHeight * 0.45; // 화면 높이의 60%
      const bookItemHeight = 60; // 각 동화책 항목의 예상 높이
      return Math.floor(containerHeight / bookItemHeight);
    }
  };

  // 동화책 목록 페이지네이션 수정
  const getCurrentPageBooks = () => {
    if (!letterBooks?.data?.book) return [];
    const booksPerPage = getBooksPerPage();
    const startIndex = bookPage * booksPerPage;
    return letterBooks.data.book.slice(startIndex, startIndex + booksPerPage);
  };

  // 페이지네이션 버튼 표시 조건 수정
  const showPaginationButtons = () => {
    if (!letterBooks?.data?.book) return false;
    const booksPerPage = getBooksPerPage();
    return letterBooks.data.book.length > booksPerPage;
  };

  // 편지 상세 페이지로 이동
  const handleLetterClick = (letterId: string) => {
    navigate(`/letterdetail/${letterId}`);
  };

  // 선택되지 않은 경우 안내 메시지 표시
  const renderRightContent = () => {
    if (isLoading) {
      return <div>로딩 중...</div>;
    }

    if (error) {
      return <div>편지함을 불러오는데 실패했습니다.</div>;
    }

    if (!letterBooks?.data?.book || letterBooks.data.book.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="font-bazzi text-outline-sm text-[7vh] mt-40 mb-4 text-center">
            편지를 작성한 동화책이 없어요~
          </h2>
          <div className="flex items-end xl:pt-10 gap-40 mt-[5vh] mb-[7vh]">
            <img src={cat} alt="Cat" className="w-[15vw] animate-shake1" />
            <img src={monkey} alt="Monkey" className="w-[15vw] animate-shake2" />
          </div>
        </div>
      );
    }

    if (!selectedBookId) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="font-bazzi text-outline-sm text-[9vh] mt-40 mb-4 text-center">
            동화책을 선택해주세요~
          </h2>
          <div className="flex items-end xl:pt-10 gap-40 mt-[5vh] mb-[7vh]">
            <img src={cat} alt="Cat" className="w-[15vw] animate-shake1" />
            <img src={monkey} alt="Monkey" className="w-[15vw] animate-shake2" />
          </div>
        </div>
      );
    }

    const selectedBook = letterBooks?.data?.book.find(book => book.book_id === selectedBookId);
    if (!selectedBook) return null;

    return (
      <div className="relative w-full flex flex-col items-center">
        {/* ✅ 오른쪽 상단 탭 버튼 */}
        <div className="fixed right-[10vw] tablet2560:top-[6vh] top-[4vh] flex justify-center gap-[5vw] z-10 mt-[2vh]">
          <div
            className={`cursor-pointer transition-transform ${activeTab === 'sent' ? 'scale-110 drop-shadow-lg' : 'opacity-50 hover:opacity-100'}`}
            onClick={() => handleTabChange('sent')}
          >
            <img src={send} alt="보낸 편지" className="w-[18vw]" />
          </div>
          <div
            className={`cursor-pointer transition-transform ${activeTab === 'received' ? 'scale-110 drop-shadow-lg' : 'opacity-50 hover:opacity-100'}`}
            onClick={() => handleTabChange('received')}
          >
            <img src={receive} alt="받은 편지" className="w-[18vw]" />
          </div>
        </div>

        {/* ✅ 편지 내용 */}
        <div className="flex items-center justify-center w-full relative">
          {/* 왼쪽 화살표 */}
          {currentPage > 0 && (
            <button
              className="absolute left-[-10%] top-[55%] transform -translate-y-1/2 hover:scale-110 transition-transform"
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <img src={arrow} alt="Previous" className="w-[4vw] rotate-180" />
            </button>
          )}

          {/* 편지 목록 */}
          <div className={`grid grid-cols-2 gap-[5vh] tablet2560:gap-20 p-8 w-[40vw]
            ${currentLetters.length <= 2 ? 'mt-[2vh] tablet2560:mt-[1vh]' : 'mt-[12vh] tablet2560:mt-[8vh]'}`}>
            {currentLetters?.map((letter) => (
              <div
                key={letter.letter_id}
                className="relative cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleLetterClick(letter.letter_id.toString())}
              >
                <img src={letterpicture} alt="Polaroid" className="w-[15vw] tablet2560:w-[30rem]" />
                <div className="text-maplestory font-bold absolute top-10 text-sm xl:top-10 xl:text-sm tablet2560:top-5 tablet2560:left-11 tablet2560:text-3xl tablet2560:mt-20 ms-6 text-gray-600">
                  {new Date(letter.created_at).toLocaleDateString()}
                </div>

                {/* 캐릭터 이미지와 이름을 감싸는 컨테이너 */}
                <div className="absolute top-[60%] left-[45%] tablet2560:left-1/2 tablet2560:top-[63%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[1.5vh]">
                  <img
                    src={letter.character_image_url || defaultchar}
                    alt="Character"
                    className="w-[16vh] tablet2560:w-[19rem] rounded-2xl object-cover"
                  />
                  <div className="text-base xl:text-xl tablet2560:text-4xl font-maplestory text-center">
                    {letter.character_name}
                  </div>
                </div>

                {/* <div className="absolute text-base bottom-3 tablet2560:left-1/2 w-full text-center font-maplestory xl:bottom-4 xl:text-xl tablet2560:bottom-12 tablet2560:text-4xl">
                  {letter.character_name}
                </div> */}
              </div>
            ))}
          </div>

          {/* 오른쪽 화살표 */}
          {letters?.content && (currentPage + 1) * LETTERS_PER_PAGE < letters.content.length && (
            <button
              className="absolute right-[-9%] top-[55%] transform -translate-y-1/2 hover:scale-110 transition-transform"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <img src={arrow} alt="Next" className="w-[4vw]" />
            </button>
          )}
        </div>

        {/* 받은 편지가 없을 때 문구 */}
        {activeTab === 'received' && letters?.content?.length === 0 && (
          <h2 className="font-bazzi text-outline-sm text-[8vh] text-center mb-[10vh]">
            아직 받은 편지가 없어요.
          </h2>
        )}
      </div>
    );
  };

  // 뒤로가기 처리
  const handleBackButton = () => {
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${mainpage})` }}>
      <BackButton onClick={handleBackButton} />
      <div className="flex justify-center items-center h-full">
        <div className="flex items-start gap-[4vw] tablet2560:gap-32">
          {/* Left Side - Letter List */}
          <div className="fixed left-[5vw] top-[12vh] w-[35vw]
           xl:left-60 tablet2560:left-80 xl:w-[25vw]
           tablet2560:top-50 tablet2560:left-[15vw] tablet2560:w-[47vh]" >
            <img src={letterlist} alt="Letter List" className="tablet2560:mt-16 tablet2560:w-800px" />
            <div className="absolute top-0 right-1 
            pt-[10vh] tablet2560:pt-48 px-[8vh]
            w-full flex flex-col justify-center">
              <ul className="space-y-3 mt-2 tablet2560:space-y-7 xl:space-y-4 font-maplestory text-lg tablet2560:text-4xl xl:text-xl">
                {getCurrentPageBooks().map((book) => (
                  <li
                    key={book.book_id}
                    className={`flex items-center gap-2 tablet2560:gap-8 xl:gap-3 
                      ${selectedBookId === book.book_id ? "bg-[#ECD5AB] bg-opacity-90" : "bg-[#e9ddc3] bg-opacity-40"} 
                      rounded-lg p-2 tablet2560:p-5 cursor-pointer hover:bg-opacity-100 transition-all`}
                    onClick={() => setSelectedBook(book.book_id)}
                  >
                    <img
                      src={selectedBookId === book.book_id ? readletter : unreadletter}
                      alt="Letter"
                      className="w-[2vw] tablet2560:w-[4vh]"
                    />
                    <span>{book.title}</span>
                  </li>
                ))}
              </ul>

              {/* 페이지네이션 버튼 */}
              {showPaginationButtons() && (
                <div className="flex flex-col items-center gap-2 mt-2">
                  {bookPage > 0 && (
                    <button
                      className="mt-[1vh] text-white hover:text-brown-700 transition-colors"
                      onClick={() => setBookPage(prev => prev - 1)}
                    >
                      <MdKeyboardArrowUp size={50} />
                    </button>
                  )}
                  {letterBooks?.data?.book && (bookPage + 1) * getBooksPerPage() < letterBooks.data.book.length && (
                    <button
                      className="mt-[1vh] text-white hover:text-brown-700 transition-colors"
                      onClick={() => setBookPage(prev => prev + 1)}
                    >
                      <MdKeyboardArrowDown size={50} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽 영역 - 선택 안내 문구 or 편지 목록 */}
          <div className="ml-[50vw] tablet2560:ml-[1000px] xl:ml-[35vw] mt-0 h-screen flex items-center">
            {renderRightContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterList;
