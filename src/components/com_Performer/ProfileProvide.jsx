import { useContext, useState } from "react";
import { ProfileContext } from "../../App";
import { useProfileId } from "./ProfileProvider";
import PerformerProfile from "./PerformerProfile";
import Addprofiles from "./Addprofiles";
import "../../styles/yoonseo/ProfileProvide.css";

const ProfileProvide = () => {
  const profiles = useContext(ProfileContext); // 프로필 정보는 이 컨텍스트에서 받아옵니다.
  const [myProfile, setMyProfile] = useState();
  const { setSelectedProfileId } = useProfileId();

  const handleProfileClick = (profileId, index) => {
    setSelectedProfileId(profileId);
    setMyProfile(index);
  };

  return (
    <div className="ProfileProvide">
      <h4>공연장에게 프로필 제공하기</h4>

      {profiles.map((profile, index) => (
        <div
          key={profile.id}
          onClick={() => handleProfileClick(profile.id, index)}
        >
          <PerformerProfile
            profile={profile}
            className={`profile-card profile-detail profile-detail${
              index + 1
            } ${myProfile === index ? "selected-profile" : ""}`}
          />
        </div>
      ))}
      <Addprofiles />
    </div>
  );
};

export default ProfileProvide;
