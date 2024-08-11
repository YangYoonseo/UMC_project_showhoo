import "../../styles/yoonseo/ProfileProvide.css";

import { useContext, useState } from "react";
import { ProfileContext } from "../../App";

import PerformerProfile from "./PerformerProfile";
import Addprofiles from "./Addprofiles";

const ProfileProvide = () => {
  const profiles = useContext(ProfileContext);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfile = (index) => {
    setSelectedProfile(index);
  };

  return (
    <div className="ProfileProvide">
      <h4>공연장에게 프로필 제공하기</h4>
      {profiles.map((profile, index) => (
        <div
          key={index} // 여기에 key prop을 추가
          onClick={() => handleProfile(index)}
        >
          <PerformerProfile
            profile={profile}
            className={`profile-card profile-detail profile-detail${
              index + 1
            } ${selectedProfile === index ? "selected-profile" : ""}`}
          />
        </div>
      ))}
      <Addprofiles />
    </div>
  );
};

export default ProfileProvide;
