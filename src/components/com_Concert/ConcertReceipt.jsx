import "../../styles/yoonseo/ConcertReceipt.css";
import Button from "../common/Button";

const ConcertReceipt = ({ rental, profile, onClose, onNext }) => {
  return (
    <div className="backdrop">
      <div className="ConcertReceipt" onClick={(e) => e.stopPropagation()}>
        <h1>{profile.name}</h1>
        <h6 className="date">
          <strong>{rental.date}</strong>에 공연장 대관을 신청했습니다
        </h6>

        <div className="school">
          <p>소속</p>
          <p>{profile.team}</p>
        </div>
        <div className="number">
          <p>전화번호</p>
          <p>{profile.phoneNumber}</p>
        </div>
        <div className="information">
          <p>소개</p>
          <p>{profile.introduction}</p>
        </div>
        <div className="image">
          {profile.profileImageUrls && profile.profileImageUrls.length > 0 ? (
            profile.profileImageUrls.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Profile ${index}`}
                className={`profile_img_${index}`}
              />
            ))
          ) : (
            <p>이미지 없습니다</p>
          )}
        </div>

        <Button text={"뒤로 가기"} type={"gray"} onClick={onClose} />
        <Button text={"다음"} type={"green"} onClick={onNext} />
      </div>
    </div>
  );
};

export default ConcertReceipt;
