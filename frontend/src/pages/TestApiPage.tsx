import { useState } from "react";
import api from "../lib/axiosInstance";

function TestApiPage() {
  const [result, setResult] = useState<string>("");

  const handleTest = async () => {
    try {
      // 밑에 주소를 실제 백엔드 api 주소로 바꿔주세용
      const response = await api.get("/books?page=1&size=6");

      // const response = await api.post("/children", {
      //   name: "정효원",
      //   mascotId: 2,
      // });

      setResult(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      console.error("API 요청 실패:", error);
      setResult("요청 실패");
    }
  };

  const showTokens = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">AccessToken 인증 테스트</h2>
      <button onClick={handleTest} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        테스트 API 호출
      </button>

      <button onClick={showTokens} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        현재 토큰 확인하기
      </button>

      <pre className="mt-6 bg-gray-100 text-sm p-4 rounded whitespace-pre-wrap">{result}</pre>
    </div>
  );
}

export default TestApiPage;
