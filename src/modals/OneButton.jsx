import "./OneButton.css";
import Button from "../components/common/Button";

const OneButton = ({ title, children, onClose, className }) => {
  return (
    <div className="backdrop">
      <div className={className}>
        <h1>{title}</h1>
        <div className="content">{children}</div>

        {/* { text, type, onClick } */}
        <Button text={"확인"} type={"green"} onClick={onClose} />
      </div>
    </div>
  );
};

export default OneButton;
