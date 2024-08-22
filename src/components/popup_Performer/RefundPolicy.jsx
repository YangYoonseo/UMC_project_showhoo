import "../../styles/yoonseo/RefundPolicy.css";
import OneButton from "../../modals/OneButton";
import axios from "axios";
import { useEffect, useState } from "react";

const RefundPolicy = ({ onClose, spaceId }) => {
  const url = "https://showhoo.site";

  const [notices, setNotices] = useState(null); // 초기값 설정
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const NoticeList = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${url}/spaces/${spaceId}/notice`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("환불 규정 불러오기", response.data.result);
        setNotices(response.data.result);
        setLoading(false);
      } catch (error) {
        console.log("환불 규정 에러", error);
      }
    };
    NoticeList();
  }, [spaceId]); // 의존성 배열에 spaceId 추가

  return (
    <div>
      {" "}
      {/* 전체를 하나의 div로 감싸줌 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <OneButton
          title="환불규정"
          onClose={onClose}
          className={"OneButton OneButton_RefundPolicy"}
        >
          <p>{notices?.notice || "환불 규정을 불러올 수 없습니다."}</p>{" "}
          {/* optional chaining */}
        </OneButton>
      )}
    </div>
  );
};

export default RefundPolicy;
