// navigate 다 뺐어요!!!

import "./Navbar_Performer.css";
import { useNavigate } from "react-router-dom";

import logo_performer from "../../assets/images/logo_performer.png";
import logo_mypage from "../../assets/images/logo_mypage.png";

const Navbar_Perforemr = () => {
  const nav = useNavigate();

  return (
    <div className="Container113">
      <div className="Frame128">
        <img src={logo_performer} alt="" />
        <div className="Frame127">
          <button className="Button47">홈</button>
          <button className="Button48">공연장 대관</button>
          <button className="Button49">대관 내역</button>
          <button className="Button50" onClick={()=>{nav("/performer_ready")}}>공연 준비</button>
        </div>
      </div>
      <div className="Frame169">
        <button className="Button51">역할 전환</button>
        <img src={logo_mypage} alt="" />
      </div>
    </div>
  );
};

export default Navbar_Perforemr;
