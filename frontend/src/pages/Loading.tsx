import mainpage from "../assets/images/mainpage/mainpage.webp";
import Bear from "../assets/images/loading/bear.webp"
import Rabbit from "../assets/images/loading/rabbit.webp"
import Cat2 from "../assets/images/loading/cat2.webp"
import Monkey from "../assets/images/loading/monkey.webp"
import Note1 from "../assets/images/loading/note1.webp"
import Note2 from "../assets/images/loading/note2.webp" 
import Note3 from "../assets/images/loading/note3.webp"

function Loading() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${mainpage})` }}>
      
      <div className="flex justify-center gap-28 mt-28">
        <img src={Note1} alt="Note1" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite1" />
        <img src={Note2} alt="Note2" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite2" />
        <img src={Note3} alt="Note3" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite3" />
        <img src={Note1} alt="Note1" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite1" />
        <img src={Note2} alt="Note2" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite2" />
        <img src={Note3} alt="Note3" className="w-[10vw] max-w-[1200px] min-w-[100px] animate-bounce-infinite3" />
      </div>

      <div className="flex items-center justify-center h-screen absolute bottom-28 left-0 w-full">
        <h1 className="text-[10vh] font-bazzi text-outline-sm text-center">잠시만 기다려주세요~</h1>
      </div>

      <div className="fixed bottom-12 left-0 w-full flex justify-center gap-8">
        <img src={Rabbit} alt="Cat1" className=" w-[20vw] max-w-[1200px] min-w-[100px] self-start animate-shake1" />
        <img src={Bear} alt="Bear" className=" w-[25vw] h-[25vw] max-w-[1200px] min-w-[100px] self-end animate-shake2" />
        <img src={Cat2} alt="Cat2" className=" w-[17vw] h-[23vw] max-w-[1200px] min-w-[100px] self-start animate-shake1" />
        <img src={Monkey} alt="Monkey" className=" w-[20vw] h-[24vw] max-w-[1200px] min-w-[100px] self-end animate-shake2" />
      </div>
    </div>
  );
}

export default Loading;
