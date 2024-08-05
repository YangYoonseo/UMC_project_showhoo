import "../../styles/yoonseo/PerformerCancel.css";
import TwoButton from "../../modals/TwoButton";

// { title, children, onClose, onNext, className }
const PerformerCancel = ({ onClose }) => {
  return (
    <TwoButton
      title={"탈퇴하시겠습니까?"}
      onClose={onClose}
      onNext={onClose}
      className={"TwoButton TwoButton_PerformerCancel"}
    >
      <p>이 계정과 관련된 프로필과 공연장 정보 모두 삭제됩니다</p>
    </TwoButton>
  );
};

export default PerformerCancel;
