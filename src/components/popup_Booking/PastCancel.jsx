import OneButton from "../../modals/OneButton";
import "../../styles/yoonseo/PastCancel.css";

const PastCancel = ({ onClose }) => {
  return (
    <OneButton
      title={
        <>
          취소가&nbsp;<span style={{ color: "#F01569" }}>불가한&nbsp;</span>
          티켓입니다
        </>
      }
      onClose={() => {
        onClose();
      }}
      className={"OneButton OneButton_PastCancel"}
    >
      <p>취소기한이 지난 티켓입니다.</p>
    </OneButton>
  );
};

export default PastCancel;
