import "../../styles/yoonseo/BookingCancel.css";
import TwoButton from "../../modals/TwoButton";
import { useState } from "react";

const BookingCancel = ({ onClose, onNext }) => {
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
