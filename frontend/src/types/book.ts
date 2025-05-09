//동화 리스트
export interface GetBookListApiResponse {
  status: number;
  data: {
    content: {
      bookId: number;
      title: string;
      imageUrl: string;
    }[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: any[];
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    size: number;
    number: number;
    sort: any[];
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  success: boolean;
  timeStamp: string;
}

//동요 불러오기
export interface GetSongApiResponse {
  status: number;
  data: {
    songUrl: string;
  };
  success: boolean;
  timeStamp: string;
}

//동화 상세
export interface GetBookContentResponse {
  success: boolean;
  status: number;
  timeStamp: string;
  data?: {
    message: string;
    completed: boolean;
    pages: {
      pageNumber: number;
      textContent: string;
      imageUrl: string | null;
      audioUrl: string;
    }[] | null;
  };
  reason?: string;
  path?: string;
}