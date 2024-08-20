import "../styles/yoonseo/LikeBooking.css";

import { useState, useEffect } from "react";
import axios from "axios";

import Navbar_Booking from "../components/common/Navbar_Booking";
import BookPrefer from "../components/com_Booking/BookPrefer";

const LikeBooking = () => {
  const [prefer, setPrefer] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPrefer = async () => {
      try {
        const response = await axios.get(
          "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/shows-prefer/1?page=0",
          // 페이지 우선 0으로 고정. 추후 수정 예정
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          "찜 목록 불러오기 성공",
          response.data.result.getPreferList
        );
        setPrefer(response.data.result.getPreferList);
      } catch (error) {
        console.log("관람자 찜 목록 오류", error);
      } finally {
        setLoading(false);
      }
    };
    getPrefer();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 메시지
  }

  return (
    <div className="LikeBooking">
      <Navbar_Booking />
      <div className="LikeBooking_content">
        <h1>관심 목록</h1>
        {console.log(prefer)}
        <div className="LikeBooking_map">
          {prefer.length === 0 ? (
            <p>관심 목록이 없습니다.</p> // 빈 상태 메시지
          ) : (
            prefer.map((concert) => (
              <BookPrefer
                key={concert.showsId}
                id={concert.showsId}
                img={concert.poster}
                name={concert.name}
                date={concert.date}
                time={concert.time}
                isComplete={concert.isComplete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeBooking;
