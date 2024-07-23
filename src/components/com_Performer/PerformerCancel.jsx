import "../../styles/PerformerCancel.css";

const PerformerCancel = ({ onClose }) => {
  return (
    <div className="backdrop">
      <div className="PerformerCancel">
        <h3>탈퇴하시겠습니까?</h3>
        <p>이 계정과 관련된 프로필과 공연장 정보 모두 삭제됩니다</p>
        <button className="backbutton" onClick={onClose}>
          뒤로 가기
        </button>
        <button className="cancelbutton">탈퇴하기</button>
      </div>
    </div>
  );
};

export default PerformerCancel;
