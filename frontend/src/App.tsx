import { lazy, Suspense } from "react";
import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
// import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import BookEnd from "./pages/bookpage/BookEnd";
import Intro from "./pages/Intro";
import IntroBook from "./pages/bookpage/IntroBook";
import BookLoading from "./pages/bookpage/BookLoading";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Profile from "./pages/profilepage/Profile";
import RecInfo from "./pages/recpage/RecInfo";
import Settings from "./pages/profilepage/Settings";
import SongEnd from "./pages/songpage/SongEnd";
import StartSettings from "./pages/profilepage/StartSettings";
import VoiceSelect from "./pages/recpage/VoiceSelect";
import VoiceRec from "./pages/recpage/VoiceRec";
import StartVoiceRec from "./pages/recpage/StartVoiceRec";
import WriteLetter from "./pages/letterpage/WriteLetter";
import SendWho from "./pages/letterpage/SendWho";
import SendLetter from "./pages/letterpage/SendLetter";
import RecSuccess from "./pages/recpage/RecSuccess";
import KidSettings from "./pages/profilepage/KidSettings";
import EditProfile from "./pages/profilepage/EditProfile";
import EditingProfile from "./pages/profilepage/EditingProfile";
import KakaoCallback from "./pages/KakaoCallback";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddingProfile from "./pages/profilepage/AddingProfile";
import TestApiPage from "./pages/TestApiPage";
import Auth from "./pages/Auth";
import bgm from "./assets/music/fairytale_bgm.mp3";
import { useMusicStore } from "./stores/musicStore";
import OauthPopup from "./pages/OauthPopup";

// Lazy Loading 적용 페이지
const LetterList = lazy(() => import("./pages/letterpage/LetterList"));
const BookDetail = lazy(() => import("./pages/bookpage/BookDetail"));
const SongDetail = lazy(() => import("./pages/songpage/SongDetail"));
const BookList = lazy(() => import("./pages/bookpage/BookList"));
const LetterDetail = lazy(() => import("./pages/letterpage/LetterDetail"));

function App() {
  // const navigate = useNavigate();
  // const { refreshAccessToken } = useAuth();

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");

  //   if (accessToken) {
  //     navigate("/profile");
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying } = useMusicStore();

  useEffect(() => {
    audioRef.current = new Audio(bgm);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;
    audioRef.current.muted = true; // 초기에 음소거 상태로 설정

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isPlaying; // isPlaying 상태에 따라 음소거 토글
      if (isPlaying) {
        audioRef.current.play();
        console.log("배경음악이 재생됩니다.");
      } else {
        console.log("배경음악이 일시정지되었습니다.");
      }
    }
  }, [isPlaying]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 인증 관련 */}
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<KakaoCallback />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/oauth/popup" element={<OauthPopup />}></Route>

          {/* lazy loading 적용 */}
          <Route path="/booklist" element={<BookList />} />
          <Route path="/bookdetail/:id" element={<BookDetail />} />
          <Route path="/songdetail/:id" element={<SongDetail />} />
          <Route path="/letterlist" element={<LetterList />} />
          <Route path="/letterdetail/:id" element={<LetterDetail />} />

          {/* lazy loading 미적용 */}
          {/* 설정 관련 */}
          <Route path="/startsettings" element={<StartSettings />} />
          <Route path="/recinfo" element={<RecInfo />} />
          <Route path="/voicerec" element={<VoiceRec />} />
          <Route path="/startvoicerec" element={<StartVoiceRec />} />
          <Route path="/recsuccess" element={<RecSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/kidsettings" element={<KidSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editingprofile" element={<EditingProfile />} />
          <Route path="/editingprofile/:id" element={<EditingProfile />} />
          <Route path="/addingprofile" element={<AddingProfile />} />

          {/* 기타 */}
          <Route path="/home" element={<Home />} />
          <Route path="/intro/:id" element={<Intro />} />
          <Route path="/introbook/:id" element={<IntroBook />} />
          <Route path="/voiceselect" element={<VoiceSelect />} />
          <Route path="/bookloading" element={<BookLoading />} />
          <Route path="/bookend" element={<BookEnd />} />
          <Route path="/songend" element={<SongEnd />} />
          <Route path="/sendwho" element={<SendWho />} />
          <Route path="/writeletter" element={<WriteLetter />} />
          <Route path="/sendletter" element={<SendLetter />} />
          <Route path="/testapipage" element={<TestApiPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
