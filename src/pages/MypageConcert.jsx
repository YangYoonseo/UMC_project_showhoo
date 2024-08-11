import "../styles/yoonseo/MypageConcert.css";

import { useState } from "react";
import Navbar_Concert from "../components/common/Navbar_Concert";
import Frame339 from "../assets/img_Performer/Frame339.png";

import PerformerCancel from "../components/popup_Performer/PerformerCancel";
import SwitchRoles from "../components/common/SwitchRoles";

const MypageConcert = () => {
  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);
  return (
    <div className="MypageConcert">
      <Navbar_Concert />
      <div className="MypageConcert_content">
        <h3>마이페이지</h3>
        <img src={Frame339} alt="" className="profile_img" />
        <p className="name">홍길동</p>

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
  );
};

export default MypageConcert;
