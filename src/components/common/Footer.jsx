import "./Footer.css";
import logo_performer from "../../assets/images/logo_performer.png";
import mdi_github from "../../assets/images/mdi_github.png";
import ri_kakao_talk_fill from "../../assets/images/ri_kakao_talk_fill.png";
import incide_instagram from "../../assets/images/lucide_instagram.png";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="LogoText">
        <img src={logo_performer} alt="" />
        <p>ShowHoo</p>
      </div>
      <div className="FooterText">
        <p className="text1">© ShowHoo. 2024 All rights reserved.</p>
        <p className="text2">개인정보 처리방침</p>
        <p className="text3">l</p>
        <p className="text4">서비스 이용약관</p>
        <div className="Frame294">
          <img src={mdi_github} alt="" className="img1" />
          <img src={ri_kakao_talk_fill} alt="" className="img2" />
          <img src={incide_instagram} alt="" className="img3" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
