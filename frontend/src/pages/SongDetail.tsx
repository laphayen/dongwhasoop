import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import BackButton from "../components/commons/BackButton";
import { useGetSong } from "../hooks/useGetSongDetail";
import { useBookStore } from "../stores/bookStore";
import { useGetBookList } from "../hooks/useGetBookList";

function SongDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { selectedBook } = useBookStore();  // Changed from setSelectedBook to selectedBook

  const { data: songUrl, isLoading, isError } = useGetSong(Number(id));

  useEffect(() => {
    if (songUrl && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Failed to autoplay:", error);
      });
    }
  }, [songUrl]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-2xl font-bazzi">노래를 불러오는 중입니다...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-2xl font-bazzi text-red-500">노래를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center">
      <BackButton to={`/intro/${id}`} />
      
      <div className="text-4xl font-bazzi mb-8">{selectedBook?.title} 동요</div> 

      {songUrl && (
        <div className="w-full max-w-md px-4">
          <audio 
            ref={audioRef} 
            controls 
            className="w-full"
            onEnded={() => navigate("/songend")}
          >
            <source src={songUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default SongDetail;
