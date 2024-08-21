import "../../styles/yoonseo/BookingCancel.css";
import TwoButton from "../../modals/TwoButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingCancel = ({ onClose, id }) => {
  const url = "https://showhoo.site";

  const nav = useNavigate();
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const bankChange = (e) => {
    setBank(e.target.value);
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const numberChange = (e) => {
    setNumber(e.target.value);
  };

  const CancelRequest = async (bank, name, number, id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const data = {
        name: name || "",
        bankName: bank || "",
        account: number || "",
        reason: "이유 미작성",
      };
      const response = await axios.put(`${url}/book/${id}/cancel`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.result);
      alert("성공");
      nav("/mypage_booking");
    } catch (error) {
      console.log("취소 요청 에러", error);
    }
  };

  const onNext = () => {
    CancelRequest(bank, name, number, id);
  };

  return (
    <TwoButton
      title={"예매 취소"}
      onClose={onClose}
      onNext={onNext}
      className={"TwoButton TwoButton_BookingCancel"}
    >
      <p>환불받을 계좌번호를 입력해주세요</p>
      <div className="full">
        <div className="bank_name">
          <textarea
            name="bank"
            className="bank"
            placeholder="은행명"
            value={bank}
            onChange={bankChange}
          />
          <textarea
            name="name"
            className="name"
            placeholder="예금주"
            value={name}
            onChange={nameChange}
          />
        </div>

        <textarea
          name="number"
          className="number"
          placeholder="계좌번호"
          value={number}
          onChange={numberChange}
        />
      </div>
    </TwoButton>
  );
};

export default BookingCancel;
