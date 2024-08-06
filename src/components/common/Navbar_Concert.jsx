import "./Navbar_Concert.css";
import { useNavigate } from "react-router-dom";

import logo_performer from "../../assets/images/logo_performer.png";
import logo_mypage from "../../assets/images/logo_mypage.png";

const Navbar_Concert = () => {
  const nav = useNavigate();

  return (
    <div className="Container113">
      <div className="Frame128 concert_img">
        <img src={logo_performer} alt="" />
        <div className="Frame127 concert_navbar">
          <button className="home">홈</button>
          <button className="concert_register">공연장 등록</button>
          <button className="concert_ready" onClick={()=>{nav("/con_ready")}}>공연 준비</button>
        </div>
      </div>
      <div className="Frame169">
        <button className="Button51">역할 전환</button>
        <img src={logo_mypage} alt="" />
      </div>
    </div>
  );
};

export default Navbar_Concert;
