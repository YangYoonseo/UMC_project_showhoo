import "../../styles/Eojin/HostReview.css";
import scoreStar from "../../assets/images/venueregisterpage_introduce/scoreStar.svg";
import HostAnswer from "./HostAnswer";

const HostReview = ({ id, profile, name, review, review_img, score, date }) => {
    const stringTodate = new Date(date);

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

    return (
        <div className="HostReview">
            <div className="profile"><img src={profile} alt="profile" /></div>
            <div className="review_container">
                <div className="name_score">
                    <h4>{name}</h4>
                    <div className="score">
                        {[...Array(score)].map((_, index) => (
                            <img key={index} src={scoreStar} alt="score" />
                        ))}
                    </div>
                </div>
                <div className="review_content">
                    <p>{review}</p>
                    {review_img && review_img.length > 0 && (
                        <div className="review-images">
                            {review_img.map((img, index) => (
                                <img key={index} src={img} alt={`review_img_${index}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="review_date">
                    {formatDate(stringTodate)}
                </div>
                <div className="review_answer">
                    <HostAnswer index={id} />
                </div>
            </div>
        </div>
    );
};

export default HostReview;
