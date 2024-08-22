import "../../styles/yoonseo/ConcertReceipt.css";

import axios from "axios";
import { useEffect, useState } from "react";

import Line40 from "../../assets/img_Performer/Line40.svg";

import Button from "../common/Button";

const Receipt = ({ onPre, onNext, id, profile }) => {
  const [receipt, setReceipt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetReceipt = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `https://showhoo.site/spaces/spaceApply/${id}/receipt`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.result);
        setReceipt(response.data.result);
        setLoading(false);
      } catch (error) {
        console.log("영수증 불러오기 에러", error);
      }
    };
    GetReceipt();
  }, []);

  if (loading) {
    return <p></p>;
  }

  return (
    <div className="backdrop">
      <div className="Receipt" onClick={(e) => e.stopPropagation()}>
        <h1>{profile.name}</h1>
        <h6 className="date">
          <strong>{receipt.date}</strong>에 공연장 대관을 신청했습니다
        </h6>
        <div className="price">
          {receipt.selected.length > 0 ? (
            receipt.selected.map((item, index) => (
              <div key={index} className="receipt-item">
                <p>{item.title || ""}</p>
                <p>
                  {item.price !== undefined
                    ? `₩${item.price.toLocaleString()}`
                    : "가격 정보 없음"}
                </p>
              </div>
            ))
          ) : (
            <p>추가 서비스가 없습니다.</p>
          )}
          <img src={Line40} alt="" className="Line40" />
          <div className="total_price">
            <p>총 합계</p>
            <p>{`₩${receipt.rentalSum.toLocaleString()}`}</p>
          </div>
        </div>
        <Button
          text={"뒤로 가기"}
          type={"gray"}
          onClick={() => {
            onPre();
          }}
        />
        <Button
          text={"확인"}
          type={"green"}
          onClick={() => {
            onNext();
          }}
        />
      </div>
    </div>
  );
};

export default Receipt;
