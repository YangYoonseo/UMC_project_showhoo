import "../../styles/yoonseo/Profile.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "../common/Button";
import Frame21 from "../../assets/img_Performer/Frame21.png";

const Profile = ({ profile = {} }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState(profile.title || "");
  const [school, setSchool] = useState(profile.school || "");
  const [number, setNumber] = useState(profile.number || "");
  const [information, setInformation] = useState(profile.information || "");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setSchool(profile.school || "");
    setInformation(profile.information || "");
    setTitle(profile.title || "");
    setNumber(profile.number || "");
  }, [profile]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="Container117_update">
      <p
        className="back"
        onClick={() => {
          nav(-1);
        }}
      >
        &lt;
      </p>
      <h3>프로필</h3>

      <div className="main_profile">
        <textarea
          className="title"
          name="title"
          placeholder="공연자/팀 이름"
          value={title}
          onChange={handleChange(setTitle)}
        />
        <textarea
          className="school"
          name="school"
          placeholder="소속"
          value={school}
          onChange={handleChange(setSchool)}
        />
        <textarea
          className="number"
          name="number"
          placeholder="전화번호"
          value={number}
          onChange={handleChange(setNumber)}
        />
        <textarea
          className="information"
          name="information"
          placeholder="소개"
          value={information}
          onChange={handleChange(setInformation)}
        />
        <div>
          <div className="add_img1">
            <p>포스터를 추가하세요</p>
            <label htmlFor="file">
              <div className="upload_button">기기에서 업로드</div>
            </label>
            <input
              type="file"
              accept="image/*"
              name="file"
              id="file"
              onChange={handleFileChange}
            />
            {file && <div>Selected file: {file.name}</div>}
          </div>

          <div className="add_img2">
            <img src={Frame21} alt="프레임 이미지" />
          </div>
          <div className="add_img3">
            <img src={Frame21} alt="프레임 이미지" />
          </div>
          <div className="add_img4">
            <img src={Frame21} alt="프레임 이미지" />
          </div>
        </div>

        <Button
          text={"완료"}
          type={"green"}
          onClick={() => {
            nav("/mypage_performer");
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
