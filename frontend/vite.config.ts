import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // 타입 에러로 인해 빌드 멈추지 않게 설정
    target: "esnext",
    minify: false,
    rollupOptions: {},
  },
  // server: {
  //   port: 3000, // CRA 호환
  //   host: '0.0.0.0', // 외부 접속 허용 (선택)
  // },
  // ↓ Vite 자체 타입 오류 무시하는 옵션은 없음. 대신 tsc 분리하거나 eslint로 제한 가능
});
