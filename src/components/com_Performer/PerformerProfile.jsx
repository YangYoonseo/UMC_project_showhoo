import "../../styles/yoonseo/PerformerProfile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import PerformerDelete from "../popup_Performer/PerformerDelete";
import Button from "../common/Button";

import call from "../../assets/img_Performer/call.svg";
import map_pin from "../../assets/img_Performer/map_pin.svg";
import Line40 from "../../assets/img_Performer/Line40.svg";

// 추후에 Id로 바꾸기? 추후 수정 해야함
const PerformerProfile = ({ profile, className }) => {
  const nav = useNavigate();
  const [popup, setPopup] = useState(false);
  const token = sessionStorage.getItem("accessToken");

  const deletePerformer = async () => {
    try {
      const response = await axios.delete(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/profile/1/${profile.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("삭제해보기", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updatePerformer = async () => {
    try {
      const data = {
        name: title,
        team: school,
        introduction: information,
        phoneNumber: number,
      };

      const response = await axios.put(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/profile/1/${profile.id}/text`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("수정", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!profile) {
    return <div className={className}>Profile not found.</div>;
  }

  return (
    <div>
      <div className={className}>
        <div className="profile-card-header">
          <span className="profile-date">{profile.date}</span>
          {profile.profileImages &&
          profile.profileImages.length > 0 &&
          profile.profileImages[0].profileImageUrl ? (
            <img src={profile.profileImages[0].profileImageUrl} alt="Profile" />
          ) : (
            <div>No Image Available</div> // 이미지가 없을 때를 대비한 처리
          )}
        </div>
        <h3>{profile.name}</h3>

        <img src={map_pin} alt="" className="school_img" />
        <p className="school_p">{profile.team}</p>

        <img src={call} alt="" className="number_img" />
        <p className="number_p">{profile.phoneNumber}</p>

        <img src={Line40} alt="" className="Line40" />
        <div className="profile-card-buttons">
          <Button
            text={"수정"}
            onClick={() => {
              nav("/performer_update", {
                state: profile,
                updatePerformer: { updatePerformer },
              });
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
      <div>
        {popup && (
          <PerformerDelete
            onClose={() => setPopup(false)}
            onConfirm={deletePerformer}
            // 삭제하고 새로고침해야 기능, 자동 새로고침 만들어야하나?
          />
        )}
      </div>
    </div>
  );
};

export default PerformerProfile;
