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
    }),
    {
      name: 'book-storage',
    }
  )
);
