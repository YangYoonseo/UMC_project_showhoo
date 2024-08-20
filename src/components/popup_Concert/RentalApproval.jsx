import TwoButton from "../../modals/TwoButton";
import axios from "axios";

const RentalApproval = ({ title, onClose, onNext, id }) => {
  // 에러 뜸 나중에 수정 필요
  const PatchSpaceApply = async (id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.patch(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/1/spaceApply/${id}`,
        {
          headers: {
            Authorization: `Bear ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("승인 에러", error);
    }
  };

  const onNextApply = () => {
    PatchSpaceApply(id);
    alert("승인되었습니다");
    onNext();
  };

  return (
    <div className="RentalApproval">
      {/* { title, children, onClose, onNext, className } */}
      <TwoButton
        title={"승인하시겠습니까"}
        onClose={onClose}
        onNext={onNextApply}
        className={"TwoButton TwoButton_RentalApproval"}
      >
        <p>'{title}'가 대관하는 것을 승인하려면 승인 버튼을 눌러주세요</p>
      </TwoButton>
    </div>
  );
};

export default RentalApproval;
