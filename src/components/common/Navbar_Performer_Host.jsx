import "./Navbar_Performer_Host.css";
import { useNavigate } from "react-router-dom";

import logo_performer from "../../assets/images/logo_performer.png";
import logo_mypage from "../../assets/images/logo_mypage.png";

const Navbar_Perforemr_Host = () => {
  const nav = useNavigate();

  return (
    <div className="Container113">
      <div className="Frame128">
        <img src={logo_performer} alt="" />
        <div className="Frame127">
          <button className="Button47">홈</button>
          {/* 홈 버튼 이동 구현할 것! */}
          <button
            className="Button48"
            onClick={() => {
              nav("/venue_register");
            }}
          >공연장 등록</button>
          <button 
            className="Button50"
            onClick={() => {
              nav("/ready_for_show");
              // 이동할 링크 이 부분에 수정해서 넣을 것!
            }}
          >공연 준비</button>
        </div>
      </div>
      <div className="Frame169">
        <button className="Button51">역할 전환</button>
        <img
          src={logo_mypage}
          alt=""
          onClick={() => {
            nav("/mypage");
          }}
        />
      </div>
    </div>
  );
};

export default Navbar_Perforemr_Host;
