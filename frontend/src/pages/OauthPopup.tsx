// src/pages/OauthPopup.tsx
import { useEffect } from "react";

function OauthPopup() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code && window.opener) {
      window.opener.postMessage({ type: "KAKAO_AUTH_CODE", code }, window.location.origin);
      window.close();
    }
  }, []);

  return <div>카카오 인증 중...</div>;
}

export default OauthPopup;
