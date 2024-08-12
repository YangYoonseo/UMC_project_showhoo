import "../../styles/yoonseo/ConcertReceipt.css";
import Button from "../common/Button";

const ConcertReceipt = ({ profile, onClose, onNext }) => {
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

        <Button text={"뒤로 가기"} type={"gray"} onClick={onClose} />
        <Button text={"다음"} type={"green"} onClick={onNext} />
      </div>
    </div>
  );
};

export default ConcertReceipt;
