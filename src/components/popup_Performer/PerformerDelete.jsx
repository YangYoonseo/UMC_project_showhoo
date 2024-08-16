import "../../styles/yoonseo/PerformerDelete.css";
import TwoButton from "../../modals/TwoButton";

const PerformerDelete = ({ onClose, onConfirm }) => {
  return (
    <TwoButton
      title={"삭제하시겠습니까?"}
      onClose={onClose}
      onNext={() => {
        onClose();
        onConfirm();
      }}
      className={"TwoButton TwoButton_PerformerDelete"}
    >
      <p>삭제하시면 복구가 불가능하니 신중히 결정해주세요.</p>
    </TwoButton>
  );
};

export default PerformerDelete;
