import "../../styles/Eojin/Host_VenueReviews.css";
import profile from "../../assets/images/venueregisterpage_introduce/profile.svg";
import review_img1 from "../../assets/images/venueregisterpage_introduce/review_img1.svg";
import review_img2 from "../../assets/images/venueregisterpage_introduce/review_img2.svg";

import HostReview from "./HostReview";

const mockdata = [
    {
        id: 0,
        profile: [profile],
        name: "김철수",
        review: "매우 깨끗하고 위치도 좋아요.",
        review_img: [],
        date: new Date('2024-08-10T10:30:00'),
        score: 5,
    },
    {
        id: 1,
        profile: [profile],
        name: "이영희",
        review: "좋은 경험이었지만 밤에 좀 시끄러웠어요.",
        review_img: [],
        date: new Date('2024-08-09T16:15:00'),
        score: 3,
    },
    {
        id: 2,
        profile: [profile],
        name: "박민수",
        review: "편안한 숙박이었고 직원들이 친절했어요.",
        review_img: [review_img1, review_img2],
        date: new Date('2024-08-08T14:45:00'),
        score: 4,
    },
    {
        id: 3,
        profile: [profile],
        name: "최지영",
        review: "기대했던 것만큼 좋지는 않았어요.",
        review_img: [],
        date: new Date('2024-08-07T11:00:00'),
        score: 2,
    }
];

const Host_VenueReviews = () => {
    // 리뷰 개수
    const reviewCount = mockdata.length;

    // 평균 평점 계산
    const averageScore = (mockdata.reduce((acc, curr) => acc + curr.score, 0) / reviewCount).toFixed(1);

    return (
        <div className="Host_VenueReviews">
            <h4>후기 {reviewCount}개<span className="hightlight">&nbsp;•&nbsp;</span>평균 평점<span className="hightlight">&nbsp;{averageScore}</span></h4>
            <div className="reviews-container">
                {mockdata.map((review) => (
                    <HostReview
                        key={review.id}
                        profile={review.profile}
                        name={review.name}
                        review={review.review}
                        review_img={review.review_img}
                        score={review.score}
                        date={review.date}
                    />
                ))}
            </div>
        </div>
    );
}

export default Host_VenueReviews;
