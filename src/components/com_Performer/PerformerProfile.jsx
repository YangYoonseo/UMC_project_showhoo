import "../../styles/yoonseo/PerformerProfile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PerformerDelete from "../popup_Performer/PerformerDelete";
import Button from "../common/Button";

import call from "../../assets/img_Performer/call.svg";
import map_pin from "../../assets/img_Performer/map_pin.svg";
import Line40 from "../../assets/img_Performer/Line40.svg";

const PerformerProfile = ({ profile, className }) => {
  const nav = useNavigate();
  const [popup, setPopup] = useState(false);
  // console.log(profile);
  return (
    <div>
      <div className={className}>
        <div className="profile-card-header">
          <span className="profile-date">{profile.date}</span>
          <img src={profile.image} alt="Profile" />
        </div>
        <h3>{profile.title}</h3>
        <img src={map_pin} alt="" className="school_img" />
        <p className="school_p">{profile.school}</p>
        <img src={call} alt="" className="call_img" />
        <p className="call_p">{profile.number}</p>
        <img src={Line40} alt="" className="Line40" />
        <div className="profile-card-buttons">
          <Button
            text={"수정"}
            onClick={() => {
              nav("/performer_update", { state: profile });
            }}
            type={"white"}
          />
          <Button
            text={"삭제"}
            onClick={() => {
              setPopup(true);
            }}
            type={"green"}
          />
        </div>
      </div>
      <div>{popup && <PerformerDelete onClose={() => setPopup(false)} />}</div>
    </div>
  );
};

export default PerformerProfile;
