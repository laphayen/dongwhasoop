import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "../api/authApi";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 accessToken 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답에서 401이면 refresh → 토큰 저장 → 재요청
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refreshToken");

        const tokenResponse = await refreshAccessToken(refreshToken);
        localStorage.setItem("accessToken", tokenResponse.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.refreshToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        console.error("토큰 재발급 실패", err);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
