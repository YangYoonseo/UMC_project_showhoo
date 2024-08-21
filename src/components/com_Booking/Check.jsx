import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

import "../../styles/yoonseo/Check.css";

import { useState, useEffect } from "react";

import axios from "axios";
import BookingProfile from "./BookingProfile";

const Check = () => {
  const url = "https://showhoo.site";
  const audienceId = sessionStorage.getItem("audienceId");
  // 일단 임시로 page 0
  const page = 0;
  const [booking, setBooking] = useState();

  useEffect(() => {
    const WatchedList = async (id) => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.put(`${url}/book/${id}/watched`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.result);
      } catch (error) {
        console.log("공연 완료 전환 에러", error);
      }
    };
    const BookingList = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/book/${audienceId}/ticket?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const getBookList = response.data.result.getBookList;
        console.log("예매 내역", getBookList);
        if (getBookList) {
          const now = new Date();

          const bookingDateTime = new Date(
            `${getBookList.date}T${getBookList.time}`
          );

          if (bookingDateTime < now) {
            WatchedList(getBookList.bookId);
          }
          setBooking(getBookList);
        } else {
          return "예매 내역 없어요";
        }
      } catch (error) {
        console.log("예매 내역 불러오기 실패", error);
      }
    };

    BookingList();
  }, []);

  return (
    <div className="Check">
      <img src={Rectangle19} alt="" className="greenbar" />
      <img src={Rectangle16} alt="" className="graybar" />

      {booking && Array.isArray(booking) ? (
        booking.map((pamphlet, index) => (
          <BookingProfile
            key={pamphlet.bookId}
            pamphlet={pamphlet}
            className={`pamphlet pamphlet-${index + 1}`}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Check;
