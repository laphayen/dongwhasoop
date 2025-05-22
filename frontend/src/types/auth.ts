// 회원인지 아닌지 확인 응답 타입
export interface CheckRegisteredApiResponse {
  status: number;
  data: {
    isRegistered: boolean;
    idToken: string;
  };
  success: boolean;
  timeStamp: string;
}

// 회원가입 할 때 보낼 요청 타입
export interface RegisterUserRequest {
  children: {
    name: string;
    mascotId: number;
  };
  voice: {
    data: string;
    format: "mp3" | "wav";
    isMale: boolean;
  };
}

// 회원가입 응답 타입
export interface RegisterUserResponse {
  status: number;
  data: {
    childId: number;
    name: string;
    mascotId: number;
    accessToken: string;
    refreshToken: string;
  };
  success: boolean;
  message: string;
  timeStamp: string;
}

// 로그인 응답 타입
export interface LoginApiResponse {
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
    isNew: boolean;
    
  };
  success: boolean;
  timeStamp: string;
}

// 로그아웃 응답 타입
export interface LogoutApiResponse {
  status: number;
  data: null;
  success: boolean;
  timeStamp: string;
}

// 회원탈퇴 응답 타입
export interface DeleteUserApiResponse {
  status: number;
  data: null;
  success: boolean;
  timeStamp: string;
}

// refreshToken 재발급
export interface GetTokenApiResponse {
  status: number;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  success: boolean;
  timeStamp: string;
}
