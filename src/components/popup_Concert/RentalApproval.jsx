import TwoButton from "../../modals/TwoButton";

const RentalApproval = ({ title, onClose, onNext }) => {
  return (
    <div className="RentalApproval">
      {/* { title, children, onClose, onNext, className } */}
      <TwoButton
        title={"승인하시겠습니까"}
        onClose={onClose}
        onNext={onNext}
        className={"TwoButton TwoButton_RentalApproval"}
      >
        <p>'{title}'가 대관하는 것을 승인하려면 승인 버튼을 눌러주세요</p>
      </TwoButton>
    </div>
  );
};

export default RentalApproval;
