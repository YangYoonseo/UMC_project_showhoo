import "../../styles/yoonseo/RefundPolicy.css";
import OneButton from "../../modals/OneButton";
import axios from "axios";
import { useEffect, useState } from "react";

const RefundPolicy = ({ onClose, spaceId }) => {
  const [notice, setNotice] = useState();

  return (
    <OneButton
      title="환불규정"
      onClose={() => {
        onClose();
      }}
      className={"OneButton OneButton_RefundPolicy"}
    >
      <p>
        1. 계약금 입금과 동시에 대관 예약이 확정되며, 입금 확인 후 상단 대관
        일정에서 확정된 예약을 확인할 수 있습니다.
      </p>
      <p className="pink_p">
        2. 계약금은 어떤 경우에도 환불되지 않으니 신중한 예약 부탁드립니다.
      </p>
      <p>3. 대관 취소 시 위약금은 다음과 같습니다:</p>
      <p>
        • 대관일 기준 60~30일 전: 대관 잔금의 30%
        <br />
        • 대관일 기준 30~15일 전: 대관 잔금의 70%
        <br />
        • 대관일 기준 14일 이내: 대관 잔금의 100%
        <br />• 대관 날짜 변경 시 기간에 상관없이 대관 잔금의 50%의 비용이
        발생합니다.
      </p>
      <p>
        태풍 등 천재지변으로 인한 날짜 변경은 위약금 없이 2달 이내로 가능하나
        취소 시에는 위약금이 발생합니다 (장마는 해당되지 않습니다).
      </p>
    </OneButton>
  );
};

export default RefundPolicy;
