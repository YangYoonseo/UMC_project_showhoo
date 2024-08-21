import "../styles/yoonseo/BookingHistory.css";
import Navbar_Booking from "../components/common/Navbar_Booking";
import Footer from "../components/common/Footer";
import Check from "../components/com_Booking/Check";
import Cancel from "../components/com_Booking/Cancel";

import { useState, useEffect } from "react";

const BookingHistroy = () => {
  const [tab, setTab] = useState("check");

  useEffect(() => {
    // 매번 페이지를 들어올 때마다 새로고침을 수행
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    } else {
      localStorage.removeItem("hasRefreshed");
    }
  }, []);
  return (
    <div className="BookingHistory">
      <Navbar_Booking />
      <Footer />
      <div className="BookingHistory_content">
        <h1>예매 내역</h1>
        <h3
          className={`check check_${tab}`}
          onClick={() => {
            setTab("check");
          }}
        >
          예매 확인
        </h3>
        <h3
          className={`cancel cancel_${tab}`}
          onClick={() => {
            setTab("cancel");
          }}
        >
          취소 내역
        </h3>
        {tab === "check" ? <Check /> : <Cancel />}
      </div>
    </div>
  );
};

export default BookingHistroy;
