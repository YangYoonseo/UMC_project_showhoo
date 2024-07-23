import "../../styles/PerformerProfile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PerformerDelete from "./PerformerDelete";

import ion_people_outline from "../../assets/img_Performer/ion_people_outline.png";
import map_pin from "../../assets/img_Performer/map_pin.png";
import Line40 from "../../assets/img_Performer/Line40.png";

const PerformerProfile = ({ profile, className }) => {
  const nav = useNavigate();
  const [popup, setPopup] = useState(false);
  return (
    <div>
      <div className={className}>
        <div className="profile-card-header">
          <span className="profile-date">{profile.date}</span>
          <img src={profile.image} alt="Profile" />
        </div>
        <h3>{profile.title}</h3>
        <img src={ion_people_outline} alt="" className="members_img" />
        <p className="members_p">{profile.members.join(", ")}</p>
        <img src={map_pin} alt="" className="school_img" />
        <p className="school_p">{profile.school}</p>
        <img src={Line40} alt="" className="Line40" />
        <div className="profile-card-buttons">
          <button
            className="edit-button"
            onClick={() => {
              nav("/performer_update", { state: { profile: profile } });
            }}
          >
            수정
          </button>
          <button
            className="delete-button"
            onClick={() => {
              setPopup(true);
            }}
          >
            삭제
          </button>
        </div>
      </div>
      <div>{popup && <PerformerDelete onClose={() => setPopup(false)} />}</div>
    </div>
  );
};

export default PerformerProfile;
