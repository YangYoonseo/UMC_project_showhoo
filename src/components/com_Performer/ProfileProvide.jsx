import "../../styles/yoonseo/ProfileProvide.css";

import { useContext } from "react";
import { ProfileContext } from "../../App";

import PerformerProfile from "./PerformerProfile";
import Addprofiles from "./Addprofiles";

const ProfileProvide = () => {
  const profiles = useContext(ProfileContext);
  return (
    <div className="ProfileProvide">
      <h4>공연장에게 프로필 제공하기</h4>
      {profiles[0] && (
        <PerformerProfile
          profile={profiles[0]}
          className={"profile-card profile-detail profile-detail1"}
        />
      )}{" "}
      {profiles[1] && (
        <PerformerProfile
          profile={profiles[1]}
          className={"profile-card profile-detail profile-detail2"}
        />
      )}{" "}
      {profiles[2] && (
        <PerformerProfile
          profile={profiles[2]}
          className={"profile-card profile-detail profile-detail3"}
        />
      )}{" "}
      {profiles[3] && (
        <PerformerProfile
          profile={profiles[3]}
          className={"profile-card profile-detail profile-detail4"}
        />
      )}
      <Addprofiles />
    </div>
  );
};

export default ProfileProvide;
