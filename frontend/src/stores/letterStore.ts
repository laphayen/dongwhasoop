import { create } from 'zustand';
import { Book, Letter, LetterSliceData, LetterDetail } from '../types/letter';

interface LetterState {
  // 동화책 조회
  selectedBookId: number | null;
  setSelectedBook: (bookId: number | null) => void;

  totalLetterBooks: Book[] | null;
  setTotalLetterBooks: (books: Book[]) => void;

  // 편지 조회 
  letters: Letter[] | null;
  setLetters: (letters: Letter[]) => void;
  
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  totalPages: number;
  setTotalPages: (pages: number) => void;
  
  messageType: 'sent' | 'received';
  setMessageType: (type: 'sent' | 'received') => void;

  // 편지 상세 조회
  selectedLetter: LetterDetail | null;
  setSelectedLetter: (letter: LetterDetail | null) => void;
}

export const useLetterStore = create<LetterState>((set) => ({
  // 동화책 조회
  selectedBookId: null,
  setSelectedBook: (bookId) => set({ selectedBookId: bookId }),
  
  totalLetterBooks: null,
  setTotalLetterBooks: (books) => set({ totalLetterBooks: books }),

  // 편지 조회
  letters: null,
  setLetters: (letters) => set({ letters }),
  
  currentPage: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  
  totalPages: 1,
  setTotalPages: (pages) => set({ totalPages: pages }),
  
  messageType: 'sent',
  setMessageType: (type) => set({ messageType: type }),

  // 편지 상세 조회
  selectedLetter: null,
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
}));

