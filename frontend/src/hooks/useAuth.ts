// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";

// export function useAuth() {
//   const navigate = useNavigate();

//   // 로그인 함수
//   const login = (accessToken: string, refreshToken: string) => {
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     navigate("/profile"); // 로그인 성공하면 프로필 페이지로 이동
//   };

//   // 로그아웃 함수
//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
//   };

//   // 토큰 갱신 함수
//   const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) {
//       logout(); // 리프레시 토큰 없으면 로그아웃
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/api/v1/credentials/reissue", {
//         refreshToken,
//       });

//       const newAccessToken = response.data.data.accessToken;
//       localStorage.setItem("accessToken", newAccessToken);
//       return newAccessToken;
//     } catch (error) {
//       console.error("토큰 갱신 실패:", error);
//       logout(); // 갱신 실패하면 로그아웃
//     }
//   };

//   return {
//     login,
//     logout,
//     refreshAccessToken,
//   };
// }
