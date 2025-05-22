// 자녀 등록 요청 타입
export interface CreateChildRequest {
  name: string;
  mascotId: number;
}

// 자녀
export interface ApiResponse<T> {
  status: number;
  data: T;
  success: boolean;
  timeStamp: string;
}

export interface ChildProfile {
  childId: number;
  childName: string;
  mascotId: number;
}

// 자녀 프로필 조회 응답 타입
export interface GetChildListApiResponse {
  status: number;
  data: {
    childList: ChildProfile[];
  };
  success: boolean;
  timeStamp: string;
}

// 자녀 프로필 수정 요청 타입
export interface UpdateChildRequest {
  name: string;
  mascotId: number;
}

// 자녀 프로필 수정 응답 타입
export interface UpdateChildProfileApiResponse {
  status: number;
  data: {
    childId: number;
    childName: string;
    mascotId: number;
  };
  success: boolean;
  timeStamp: string;
}

// 자녀 프로필 삭제 응답 타입
export interface DeleteChildProfileApiResponse {
  status: number;
  data: null;
  success: boolean;
  timeStamp: string;
}
