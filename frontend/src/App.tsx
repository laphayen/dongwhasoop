import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
// import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import BookEnd from "./pages/BookEnd";
import Intro from "./pages/Intro";
import IntroBook from "./pages/IntroBook";
import BookList from "./pages/BookList";
import BookLoading from "./pages/BookLoading";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import LetterDetail from "./pages/LetterDetail";
import LetterList from "./pages/LetterList";
import Profile from "./pages/Profile";
import RecInfo from "./pages/RecInfo";
import Settings from "./pages/Settings";
import SongDetail from "./pages/SongDetail";
import SongEnd from "./pages/SongEnd";
import StartSettings from "./pages/StartSettings";
import VoiceSelect from "./pages/VoiceSelect";
import VoiceRec from "./pages/VoiceRec";
import WriteLetter from "./pages/WriteLetter";
import BookDetail from "./pages/BookDetail";
import SendWho from "./pages/SendWho";
import SendLetter from "./pages/SendLetter";
import RecSuccess from "./pages/RecSuccess";
import KidSettings from "./pages/KidSettings";
import EditProfile from "./pages/EditProfile";
import EditingProfile from "./pages/EditingProfile";
import KakaoCallback from "./pages/KakaoCallback";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddingProfile from "./pages/AddingProfile";
import TestApiPage from "./pages/TestApiPage";
import Auth from "./pages/Auth";
import bgm from "./assets/music/fairytale_bgm.mp3";
import { useMusicStore } from "./stores/musicStore";

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
    audioRef.current.volume = 0.5;
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
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/bookend" element={<BookEnd></BookEnd>}></Route>
        <Route path="/intro/:id" element={<Intro></Intro>}></Route>
        <Route path="/introbook/:id" element={<IntroBook></IntroBook>}></Route>
        <Route path="/booklist" element={<BookList></BookList>}></Route>
        <Route path="/bookloading" element={<BookLoading></BookLoading>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/loading" element={<Loading></Loading>}></Route>
        <Route path="/letterdetail" element={<LetterDetail></LetterDetail>}></Route>
        <Route path="/letterdetail/:id" element={<LetterDetail></LetterDetail>}></Route>
        <Route path="/letterlist" element={<LetterList></LetterList>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/recinfo" element={<RecInfo></RecInfo>}></Route>
        <Route path="/settings" element={<Settings></Settings>}></Route>
        <Route path="/songdetail/:id" element={<SongDetail></SongDetail>}></Route>
        <Route path="/songend" element={<SongEnd></SongEnd>}></Route>
        <Route path="/startsettings" element={<StartSettings></StartSettings>}></Route>
        <Route path="/voiceselect" element={<VoiceSelect></VoiceSelect>}></Route>
        <Route path="/voicerec" element={<VoiceRec></VoiceRec>}></Route>
        <Route path="/writeletter" element={<WriteLetter></WriteLetter>}></Route>
        <Route path="/bookdetail/:id" element={<BookDetail></BookDetail>}></Route>
        <Route path="/sendwho" element={<SendWho></SendWho>}></Route>
        <Route path="/sendletter" element={<SendLetter></SendLetter>}></Route>
        <Route path="/recsuccess" element={<RecSuccess></RecSuccess>}></Route>
        <Route path="/kidsettings" element={<KidSettings></KidSettings>}></Route>
        <Route path="/editprofile" element={<EditProfile></EditProfile>}></Route>
        <Route path="/editingprofile" element={<EditingProfile></EditingProfile>}></Route>
        <Route path="/editingprofile/:id" element={<EditingProfile></EditingProfile>}></Route>
        <Route path="/addingprofile" element={<AddingProfile></AddingProfile>}></Route>
        <Route path="/auth" element={<KakaoCallback></KakaoCallback>}></Route>
        <Route path="/testapipage" element={<TestApiPage></TestApiPage>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
      </Routes>
    </>
  );
}

export default App;
