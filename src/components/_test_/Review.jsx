import "../../styles/yoonseo/Review.css";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

const Review = () => {
  const ex_review = [
    {
      id: 1,
      content: "사장님 심보가 고약하십니다. 공연장은 좋네요.",
      date: "2024.08.23 14:43:00",
      rating: 4,
    },

    {
      id: 2,
      content:
        "공연장 직접 둘러보면서 사장님이 친절하게 설명해주셔서 너무 좋았습니다!! 다음에도 여기서 공연할게요:) 반항하세요~",
      date: "2023.12.23 11:34:45",
      rating: 4,
    },
  ];

  const ex_answer = [
    {
      id: 1,
      title: "001 클럽",
      content:
        "안녕하세요 소울님. 저희 001 클럽에서 만족스러운 시간 보내셨길 바랍니다. 이용해주셔서 감사합니다.",
      date: "2024.08.23 17:43:54",
    },
    {
      id: 2,
      title: "플렉스 라운지",
      content:
        "안녕하세요 길동님. 긍정적인 후기 남겨주셔서 감사합니다! 다음에도 꼭 저희 플렉스 라운지 이용해주세요~",
      date: "2023.12.23 15:12:51",
    },
  ];

  return (
    <div className="Review">
      <img src={Rectangle19} alt="" className="greenbar" />
      <img src={Rectangle16} alt="" className="graybar" />
    </div>
  );
};

export default Review;
