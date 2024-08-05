import "../../styles/yoonseo/RentalApply.css";
import TwoButton from "../../modals/TwoButton";

const RentalApply = ({ onClose, onCompletedOpen }) => {
  return (
    <TwoButton
      title="대관 신청하시겠습니까?"
      onClose={() => {
        onClose();
      }}
      onNext={() => {
        onClose();
        onCompletedOpen();
      }}
      className={"TwoButton TwoButton_RentalApply"}
    >
      <p>
        대관 신청 이후, 공연장측에서{" "}
        <span>송금을 확인한 후, 대관 신청이 승인</span>됩니다. 공연장측의
        불가피한 상황으로 <span>대관 신청이 거부될 수 있으며,</span> 이러한 상황
        발생시 <span>예약금은 보내신 계좌로 환불</span>됩니다.
      </p>
    </TwoButton>
  );
};

export default RentalApply;
