import "../styles/yoonseo/MypageBooking.css";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PamphletContext } from "../App";

import Frame339 from "../assets/img_Performer/Frame339.png";

import Navbar_Booking from "../components/common/Navbar_Booking";
import BookingProfile from "../components/com_Booking/BookingProfile";
import { FaLessThan } from "react-icons/fa6";
import SwitchRoles from "../components/common/SwitchRoles";

const MypageBooking = () => {
  const nav = useNavigate();
  const { pamphlets } = useContext(PamphletContext);
  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);

  return (
    <div className="MypageBooking">
      <Navbar_Booking />
      <div className="MypageBooking_content">
        <h3 className="mypage_h3">마이페이지</h3>
        <img src={Frame339} alt="" className="profile_img" />
        <p className="name">홍길동</p>
        <p className="next">
          길동님의<span>&nbsp;다음&nbsp;</span>공연이에요
        </p>
        <BookingProfile
          key={pamphlets[0].id} // key로 index 대신 pamphlet.id를 사용하는 것이 좋습니다
          pamphlet={pamphlets[0]}
          className={"pamphlet pamphlet_next"}
        />

        <div className="choice">
          <button
            onClick={() => {
              nav("/alarm");
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
