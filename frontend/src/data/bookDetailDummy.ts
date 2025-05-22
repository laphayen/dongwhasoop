import Sim1 from "../assets/dummysim/simcheong1.webp";
import Sim2 from "../assets/dummysim/simcheong2.webp";
import Sim3 from "../assets/dummysim/simcheong3.webp";
import Sim4 from "../assets/dummysim/simcheong4.webp";
import Sim5 from "../assets/dummysim/simcheong5.webp";
import Sim6 from "../assets/dummysim/simcheong6.webp";
import Sim7 from "../assets/dummysim/simcheong7.webp";
import Sim8 from "../assets/dummysim/simcheong8.webp";
import Sim9 from "../assets/dummysim/simcheong9.webp";
import Sim10 from "../assets/dummysim/simcheong10.webp";

export interface BookPage {
  page: number;
  text: string;
  image: string;
}

export interface BookDetail {
  id: number;
  title: string;
  pages: BookPage[];
}

const shimcheongDetail: BookDetail = {
  id: 1,
  title: "심청전",
  pages: [
    {
      page: 1,
      text: "옛날 옛적에 심 봉사와 그의 딸 심청이가 살고 있었어요.",
      image: Sim1,
    },
    {
      page: 2,
      text: "심청이는 눈이 먼 아버지를 정성껏 모시며 살았어요.",
      image: Sim2,
    },
    {
      page: 3,
      text: "어느 날, 심 봉사는 절에서 공양미 삼백 석을 바치면 눈을 뜰 수 있다는 말을 들었어요.",
      image: Sim3,
    },
    {
      page: 4,
      text: "심청이는 아버지를 위해 인당수에 몸을 던지기로 결심했어요.",
      image: Sim4,
    },
    {
      page: 5,
      text: "심청이는 인당수에 빠졌지만, 용왕님의 궁궐로 들어가게 되었어요.",
      image: Sim5,
    },
    {
      page: 6,
      text: "용왕님은 심청이의 효심에 감동하여 그녀를 꽃으로 피워내어 다시 인간 세상으로 돌려보냈어요.",
      image: Sim6,
    },
    {
      page: 7,
      text: "심청이는 왕비가 되어 다시 아버지를 찾기 시작했어요.",
      image: Sim7,
    },
    {
      page: 8,
      text: "나라에서는 맹인을 위한 큰 잔치를 열었고, 그곳에 심 봉사도 초대되었어요.",
      image: Sim8,
    },
    {
      page: 9,
      text: "심청이는 잔치 자리에서 아버지를 만나 눈물을 흘렸어요.",
      image: Sim9,
    },
    {
      page: 10,
      text: "기적처럼 심 봉사의 눈이 떠졌고, 부녀는 다시 행복하게 살았답니다.",
      image: Sim10,
    },
  ],
};

export default shimcheongDetail;
