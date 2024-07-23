import "./TwoButton.css";
import Button from "../components/common/Button";

const TwoButton = ({ title, children, onClose, onNext, className }) => {
  return (
    <div className="backdrop">
      <div className={className}>
        <h1>{title}</h1>
        <div className="content">{children}</div>
        {/* { text, type, onClick } */}
        <Button text={"취소"} type={"gray"} onClick={onClose} />
        <Button text={"신청하기"} type={"green"} onClick={onNext} />
      </div>
    </div>
  );
};

export default TwoButton;
