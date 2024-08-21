import React, { useState, useEffect } from "react";
import axios from "axios";
import HostReview from "./HostReview";
import Pagination from "./Pagination";
import "../../styles/Eojin/Host_VenueReviews.css";

const Host_VenueReviews = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4; // 한 페이지당 리뷰 수

    const spaceId = 4;
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
            setData(res.data.result);
            console.log("다운로드 양식 보기", res.data);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        getDownloadData();
    }, []);

    // 리뷰 개수
    const reviewCount = data.length;

    // 평균 평점 계산
    const averageScore = (data.reduce((acc, curr) => acc + curr.grade, 0) / reviewCount).toFixed(1);

    // 현재 페이지에 해당하는 리뷰 데이터 계산
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = data.slice(indexOfFirstReview, indexOfLastReview);

    // 페이지 번호 클릭 시 호출되는 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="Host_VenueReviews">
            <h4>후기 {reviewCount}개<span className="hightlight">&nbsp;•&nbsp;</span>평균 평점<span className="hightlight">&nbsp;{averageScore}</span></h4>
            <div className="reviews-container">
                {currentReviews.map((review) => (
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
                <Pagination
                    reviewsPerPage={reviewsPerPage}
                    totalReviews={reviewCount}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

export default Host_VenueReviews;

