// reviewpanel.jsx
// 최대 이미지 크기 설정 하는 부분 -> inline style로
import React, { useState } from "react";
import "./ReviewPanel.css";
import scoreStar from "../../assets/images/venueregisterpage_introduce/scoreStar.svg";
import nonscoredStar from "../../assets/images/venueregisterpage_introduce/nonscoredStar.svg";
import review_add_panel from "../../assets/images/venuedetailpage/review_add_image.svg";
import basic_profileimage from "../../assets/images/venuedetailpage/profileimage.png";

const ReviewPanel = ({ reviews, setReviews, profileImage, name, context, reviewImage, grade, date, answer, dateAnswer }) => {
    // 날짜 포맷팅 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    };

    const formatDateAnswer = (dateAnswer) => {
        const year = dateAnswer.getFullYear();
        const month = String(dateAnswer.getMonth() + 1).padStart(2, '0');
        const day = String(dateAnswer.getDate()).padStart(2, '0');
        const hours = String(dateAnswer.getHours()).padStart(2, '0');
        const minutes = String(dateAnswer.getMinutes()).padStart(2, '0');
        const seconds = String(dateAnswer.getSeconds()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
    };

    // 후기 작성 기능 추가
    const [newContext, setNewContext] = useState('');
    const [newGrade, setNewGrade] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // 유의사항 팝업 표시 상태
    const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지 상태

    const handleStarClick = (starIndex) => {
        setNewGrade(starIndex);
        setSelectedStars(starIndex);
    };

    const handleReviewSubmit = () => {
        if (newContext.trim() !== '') {
            const newReview = {
                id: reviews.length + 1,
                profileImage: profileImage || basic_profileimage,  // 추후에 유저 프로필 이미지 연동
                name: name || "사용자",  // 추후에 유저 이름 연동
                grade: newGrade,
                context: newContext,
                date: new Date(),
                reviewImage: uploadedImage ? [uploadedImage] : [],
                answer: null,
                dateAnswer: null,
            };
            setReviews([newReview, ...reviews]);
            setNewContext('');
            setNewGrade(0);
            setSelectedStars(0);
            setUploadedImage(null); // 업로드된 이미지 초기화 >> 별점란 초기화
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNoticeClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    if (!context) {
        return (
            <>
                {showPopup && (
                    <div className="popup-overlay32">
                        <div className="popup-container32">
                            <h2>후기 작성 시 유의사항</h2>
                            <p>아래와 같이 후기 성격에 맞지 않거나 욕설 등 유해 정보가 담긴 경우, 혹은 타인의 신상정보가 노출될 수 있는 게시물은 목록에서 삭제될 수 있으니 이용에 참고 부탁드립니다</p>
                            <p>1. 실제 방문 장소 또는 서비스 이용 후 경험을 기술하지 않은 경우<br></br>2. 장소 방문자의 후기가 아닌, 평점 관리 등 홍보 목적의 게시글일 경우<br></br>3. 욕설, 비방, 차별, 혐오에 해당하는 내용이 담긴 게시글일 경우<br></br>4. 신분증 등 개인의 신상 정보가 노출될 수 있는 게시글일 경우<br></br>5. 기타 다른 사용자의 정상적인 서비스 이용을 방해하는 경우</p>
                            <button className="popup-close-button32" onClick={closePopup}>확인</button>
                        </div>
                    </div>
                )}

                <div className="review-input-section">
                    <div className="review-stars">
                        {[...Array(5)].map((_, index) => (
                            <img
                                key={index}
                                src={selectedStars >= index + 1 ? scoreStar : nonscoredStar}
                                alt={`star-${index + 1}`}
                                className={`star ${selectedStars >= index + 1 ? 'selected' : ''}`}
                                onClick={() => handleStarClick(index + 1)}
                            />
                        ))}
                        <span className={selectedStars > 0 ? 'selected' : ''}>{newGrade}/5</span>
                    </div>
                    <textarea
                        className="review-textarea"
                        placeholder="작성한 후기는 마이페이지와 장소상세에 노출되며 공연장을 포함한 다른 사람들이 볼 수 있으니, 서로를 배려하는 마음으로 작성해주세요"
                        value={newContext}
                        onChange={(e) => setNewContext(e.target.value)}
                    />
                    <button className="submit-review-button" onClick={handleReviewSubmit}>
                        등록
                    </button>
                    <label htmlFor="upload-image" className="review-add-panel">
                        {uploadedImage ? (
                            <img src={uploadedImage} alt="Uploaded Preview" style={{ maxHeight: '100px', objectFit: 'cover' }} />
                        ) : (
                            <img src={review_add_panel} alt="Add" />
                        )}
                    </label>
                    <input
                        id="upload-image"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <p className="notice-review" onClick={handleNoticeClick}>후기 작성 시 유의사항</p>
                </div>
            </>
        );
    }

    return (
        <div className="HostReview">
            <div className="profile"><img src={profileImage} alt="profile" /></div>
            <div className="review_container">
                <div className="name_score">
                    <h4>{name}</h4>
                    <div className="score">
                        {[...Array(grade)].map((_, index) => (
                            <img key={index} src={scoreStar} alt="score" />
                        ))}
                    </div>
                </div>
                <div className="review_content">
                    <p>{context}</p>
                    {reviewImage && reviewImage.length > 0 && (
                        <div className="review-images">
                            {reviewImage.map((img, index) => (
                                <img key={index} src={img} alt={`reviewImage_${index}`} style={{ maxHeight: '220px', objectFit: 'cover' }} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="review_date">
                    {formatDate(date)}
                </div>
                {answer && (
                    <div className="review_answer">                
                        <div className="Myanswer">
                            <h4>공연장의 답글</h4>
                            <p className="answer" style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
                            <p className="answer_date">{formatDateAnswer(dateAnswer)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewPanel;
