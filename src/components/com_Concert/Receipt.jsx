import "../../styles/yoonseo/ConcertReceipt.css";

import Button from "../common/Button";

const Receipt = ({ onPre, onNext, profile }) => {
  return (
    <div className="backdrop">
      <div className="Receipt" onClick={(e) => e.stopPropagation()}>
        <h1>{profile.title}</h1>
        <h6 className="date">
          <strong>{profile.date}</strong>에 공연장 대관을 신청했습니다
        </h6>
        <div className="price">
          <p>대관료 ₩700,000</p>
        </div>
        <Button
          text={"뒤로 가기"}
          type={"gray"}
          onClick={() => {
            onPre();
          }}
        />
        <Button
          text={"확인"}
          type={"green"}
          onClick={() => {
            onNext();
          }}
        />
      </div>
    </div>
  );
};

export default Receipt;
