import "../../styles/RentalCompleted.css";
import OneButton from "../../modals/OneButton";

const RentalCompleted = ({ onClose }) => {
  return (
    <OneButton
      title="대관 신청이 완료됐습니다!"
      onClose={() => {
        onClose();
      }}
      className={"OneButton OneButton_RentalCompleted"}
    >
      <p>공연장이 승인하기까지 시간이 소요될 수 있습니다</p>
    </OneButton>
  );
};

export default RentalCompleted;
