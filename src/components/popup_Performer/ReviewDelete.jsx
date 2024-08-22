import TwoButton from "../../modals/TwoButton";
import "../../styles/yoonseo/ReviewDelete.css";

const ReviewDelete = ({ onClose, onDelete, id }) => {
  return (
    <TwoButton
      title="삭제하시겠습니까?"
      onClose={() => {
        onClose();
      }}
      onNext={() => {
        onDelete(id);
        onClose();
      }}
      className={"TwoButton TwoButton_ReviewDelete"}
    >
      <p>삭제되면 복구가 불가능하니 신중히 결정해주세요</p>
    </TwoButton>
  );
};

export default ReviewDelete;
