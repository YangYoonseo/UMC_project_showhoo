import "../../styles/yoonseo/ConcertReceipt.css";
import Button from "../common/Button";

const ConcertReceipt = ({ profile, onClose }) => {
  return (
    <div className="backdrop">
      <div className="ConcertReceipt" onClick={(e) => e.stopPropagation()}>
        <h1>{profile.title}</h1>
        <h6 className="date">
          <strong>{profile.date}</strong>에 공연장 대관을 신청했습니다
        </h6>
        <div className="school">
          <p>소속</p>
          <p>{profile.school}</p>
        </div>
        <div className="number">
          <p>전화번호</p>
          <p>{profile.number}</p>
        </div>
        <div className="information">
          <p>소개</p>
          <p>{profile.information}</p>
        </div>
        <div className="image">
          <img src={profile.image} alt="profile" />
        </div>
        <h3>영수증</h3>
        <div className="price">
          <p>대관료...</p>
        </div>
        <Button text={"확인"} type={"green"} onClick={onClose} />
        <div className="empty"></div>
      </div>
    </div>
  );
};

export default ConcertReceipt;
