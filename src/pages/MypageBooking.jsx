import "../styles/yoonseo/MypageBooking.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar_Booking from "../components/common/Navbar_Booking";
import BookingProfile from "../components/com_Booking/BookingProfile";
import SwitchRoles from "../components/common/SwitchRoles";

const MypageBooking = () => {
  const id = sessionStorage.getItem("audienceId");
  const fullName = sessionStorage.getItem("name");
  const name = fullName.substring(1);
  const nav = useNavigate();
  const poster = sessionStorage.getItem("poster");

  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [nextShow, setNextShow] = useState({});

  useEffect(() => {
    const MypageView = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/book/1/next`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("마이프로필", response.data.result);

        const nextResult = response.data.result;

        // 임시용 데이터
        setNextShow({
          bookId: nextResult.bookId || "",
          showsId: nextResult.showsId || "",
          poster: nextResult.poster || "포스터 없음",
          name: nextResult.name || "이름 없음",
          date: nextResult.date || "날짜 없음",
          time: nextResult.time || "시간 없음",
          place: nextResult.place || "장소 없음",
          performer: nextResult.perforemr || "공연자 없음",
          status: nextResult.status || "상태 없음",
          detail: nextResult.detail || "디테일 없음",
          isCancellable: nextResult.isCancellable || "취소 여부 없음",
        });
      } catch (error) {
        console.error("프로필 정보를 불러오는데 실패했습니다:", error);
      }
    };
    MypageView();
  }, []);

  return (
    <div className="MypageBooking">
      <Navbar_Booking />
      <div className="MypageBooking_content">
        <h3 className="mypage_h3">마이페이지</h3>
        <img src={poster} alt="" className="profile_img" />
        <p className="name">{fullName}</p>
        <p className="next">
          {name}님의<span>&nbsp;다음&nbsp;</span>공연이에요
        </p>
        <BookingProfile
          key={nextShow.bookId} // key로 index 대신 pamphlet.id를 사용하는 것이 좋습니다
          pamphlet={nextShow}
          className={"pamphlet pamphlet_next"}
        />

        <div className="choice">
          <button
            onClick={() => {
              nav("/alarm_booking");
            }}
          >
            알림
          </button>

          <button
            onClick={() => {
              nav("/booking_history");
            }}
          >
            예매내역
          </button>
          <button
            onClick={() => {
              nav("/like_booking");
            }}
          >
            관심목록
          </button>

          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            역할 전환
          </button>
          <button>로그아웃</button>
          <button
            onClick={() => {
              setCancel(true);
            }}
          >
            회원탈퇴
          </button>
        </div>
        {cancel && <PerformerCancel onClose={() => setCancel(false)} />}
        {popup && (
          <SwitchRoles
            onClose={() => {
              setPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MypageBooking;
