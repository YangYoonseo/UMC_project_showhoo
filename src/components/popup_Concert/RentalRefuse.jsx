import TwoButton from "../../modals/TwoButton";

const RentalRefuse = ({ title, onClose, onNext }) => {
  return (
    <div className="RentalRefuse">
      {/* { title, children, onClose, onNext, className } */}
      <TwoButton
        title={"거절하시겠습니까"}
        onClose={onClose}
        onNext={onNext}
        className={"TwoButton TwoButton_RentalRefuse"}
      >
        <p>'{title}'의 대관을 거절하려면 거절 버튼을 눌러주세요</p>
      </TwoButton>
    </div>
  );
};

export default RentalRefuse;
