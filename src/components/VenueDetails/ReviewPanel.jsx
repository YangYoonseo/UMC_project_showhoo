//reviewpanel.jsx
import "./ReviewPanel.css";
import scoreStar from "../../assets/images/venueregisterpage_introduce/scoreStar.svg";
//import HostAnswer from "./HostAnswer";

const ReviewPanel = ({ key, id, profileImage, name, context, reviewImage, grade, date, answer, dateAnswer }) => {
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

        // 날짜 포맷팅 함수
        const formatDateAnswer = (dateAnswer) => {
            const year = dateAnswer.getFullYear();
            const month = String(dateAnswer.getMonth() + 1).padStart(2, '0');
            const day = String(dateAnswer.getDate()).padStart(2, '0');
            const hours = String(dateAnswer.getHours()).padStart(2, '0');
            const minutes = String(dateAnswer.getMinutes()).padStart(2, '0');
            const seconds = String(dateAnswer.getSeconds()).padStart(2, '0');
    
            return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
        };

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
                                <img key={index} src={img} alt={`reviewImage_${index}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="review_date">
                    {formatDate(date)}
                </div>
                <div className="review_answer">                
                    <div className="Myanswer">
                        <h4>공연장의 답글</h4>
                        <p className="answer" style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
                        <p className="answer_date">{formatDateAnswer(dateAnswer)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPanel;