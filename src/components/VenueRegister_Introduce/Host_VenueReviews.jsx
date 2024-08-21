import "../../styles/Eojin/Host_VenueReviews.css";
import { useState, useEffect } from "react";

import HostReview from "./HostReview";

// import profile from "../../assets/images/venueregisterpage_introduce/profile.svg";
// import review_img1 from "../../assets/images/venueregisterpage_introduce/review_img1.svg";
// import review_img2 from "../../assets/images/venueregisterpage_introduce/review_img2.svg";

const Host_VenueReviews = () => {
    const [data, setData] = useState([]);

    const spaceId = 1; 

    async function getDownloadData() {
        const token = sessionStorage.getItem("accessToken");
        try {
            const res = await axios.get(
                `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/review/space/${spaceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },           
                }
            );
            const data = res.data.result;
            console.log("다운로드 양식 보기", res.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getDownloadData();
    }, []);

    // 리뷰 개수
    const reviewCount = data.length;

    // 평균 평점 계산
    const averageScore = (data.reduce((acc, curr) => acc + curr.grade, 0) / reviewCount).toFixed(1);

    return (
        <div className="Host_VenueReviews">
            <h4>후기 {reviewCount}개<span className="hightlight">&nbsp;•&nbsp;</span>평균 평점<span className="hightlight">&nbsp;{averageScore}</span></h4>
            <div className="reviews-container">
                {data.map((review) => (
                    <HostReview
                        key={review.id}
                        id={review.id}
                        profile={review.memberUrl}
                        name={review.memberName}
                        review={review.content}
                        review_img={review.imageUrls}
                        score={review.grade}
                        date={review.updatedAt}
                    />
                ))}
            </div>
        </div>
    );
}

export default Host_VenueReviews;
