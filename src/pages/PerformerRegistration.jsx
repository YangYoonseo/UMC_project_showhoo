import "../styles/PerformerRegistration.css";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../App";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import PerformerProfile from "../components/com_Performer/PerformerProfile";

import Frame21 from "../assets/img_Performer/Frame21.png";

const new_profile = {
  date: "새 프로필",
  school: "소속",
  information: "소개",
};

const PerformerRegistration = () => {
  const nav = useNavigate();
  const profiles = useContext(ProfileContext);

  return (
    <div className="PerformerRegistraion">
      <Navbar_Perforemr />
      <Footer />
      <div className="Container117">
        <p className="p_profile">공연자 프로필</p>
        <div className="profiles">
          {profiles.map((profile, index) => (
            <PerformerProfile
              key={index}
              profile={profile}
              className={`profile-card profile-${index + 1}`}
            />
          ))}
        </div>
        <div onClick={() => nav("/performer_update")} className="add_profile">
          <p>프로필을 더 추가하세요</p>
          <img src={Frame21} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PerformerRegistration;
