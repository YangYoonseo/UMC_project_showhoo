import "../../styles/PerformerDelete.css";

const PerformerDelete = ({ onClose }) => {
  return (
    <div className="backdrop">
      <div className="PerformerDelete">
        <h3>삭제하시겠습니까?</h3>
        <p>삭제하시면 복구가 불가능하니 신중히 결정해주세요.</p>
        <div className="PerformerDelete_button">
          <button className="backButton" onClick={onClose}>
            뒤로 가기
          </button>
          <button className="deleteButton">삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default PerformerDelete;
