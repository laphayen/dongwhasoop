import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetBookListApiResponse } from '../types/book';

interface BookStoreState {
  selectedBook: GetBookListApiResponse['data']['content'][0] | null;
  setSelectedBook: (book: GetBookListApiResponse['data']['content'][0]) => void;
  
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  totalBooks: GetBookListApiResponse['data']['content'] | null;
  setTotalBooks: (books: GetBookListApiResponse['data']['content']) => void;

  // 페이지 데이터 추가
  bookPages: {
    pageNumber: number;
    textContent: string;
    imageUrl: string | null;
    audioUrl: string;
  }[] | null;
  setBookPages: (pages: BookStoreState['bookPages']) => void;

  // 동화 생성 상태 관리
  bookStatus: { [bookId: number]: 'pending' | 'completed' };
  setBookStatus: (bookId: number, status: 'pending' | 'completed') => void;
}

export const useBookStore = create<BookStoreState>()(
  persist(
    (set) => ({
      selectedBook: null,
      setSelectedBook: (book) => set({ selectedBook: book }),
      
      currentPage: 0,
      setCurrentPage: (page) => set({ currentPage: page }),
      
      totalBooks: null,
      setTotalBooks: (books) => set({ totalBooks: books }),
      
      // post 요청으로 온 page 데이터 저장
      bookPages: null,
      setBookPages: (pages) => set({ bookPages: pages }),

      // 추가: 동화 생성 상태 초기화
      bookStatus: {},
      setBookStatus: (bookId, status) => set((state) => ({
        bookStatus: { ...state.bookStatus, [bookId]: status },
      })),
    }),
    {
      name: 'book-storage',
    }
  )
);
