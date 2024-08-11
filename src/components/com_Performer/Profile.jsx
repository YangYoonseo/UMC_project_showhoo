import "../../styles/yoonseo/Profile.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "../common/Button";
import Frame21 from "../../assets/img_Performer/Frame21.svg";
import TrashIcon from "../../assets/img_Performer/TrashIcon.svg";

const Profile = ({ profile = {} }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState(profile.title || "");
  const [school, setSchool] = useState(profile.school || "");
  const [number, setNumber] = useState(profile.number || "");
  const [information, setInformation] = useState(profile.information || "");
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    setSchool(profile.school || "");
    setInformation(profile.information || "");
    setTitle(profile.title || "");
    setNumber(profile.number || "");
  }, []); //[profile]일땐 안된다...왜??

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const updateImages = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) =>
      [...prevImages, ...imageUrls].slice(0, 4)
    );
  };

  const removeImages = (index) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
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

        {/* 첫 번째 이미지 업로드 */}
        <div className="add_img">
          {!uploadedImages[0] ? (
            <div className="add_img1">
              <p>포스터를 추가하세요</p>
              <label htmlFor="imageUpload">
                <div className="upload_button">기기에서 업로드</div>
              </label>
            </div>
          ) : (
            <div>
              <img
                src={uploadedImages[0]}
                alt="uploaded 1"
                className="add_img1"
              />
              <img
                src={TrashIcon}
                alt="Edlete"
                className="delete delete_img1"
                onClick={() => removeImages(0)}
              />
            </div>
          )}
        </div>

        {/* 이미지 업로드 input */}
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          style={{ display: "none" }}
          onChange={updateImages}
        />

        {/* 나머지 이미지들 */}
        {[1, 2, 3].map((index) => (
          <div key={index}>
            {!uploadedImages[index] ? (
              <div className={`add_img${index + 1}`}>
                <label htmlFor="imageUpload">
                  <img src={Frame21} alt={`프레임 이미지 ${index + 1}`} />
                </label>
              </div>
            ) : (
              <div>
                <img
                  src={uploadedImages[index]}
                  alt={`uploaded ${index + 1}`}
                  className={`add_img${index + 1}`}
                />
                <img
                  src={TrashIcon}
                  alt="delete"
                  className={`delete delete_img${index + 1}`}
                  onClick={() => removeImages(index)}
                />
              </div>
            )}
          </div>
        ))}

        <Button
          text={"완료"}
          type={"green"}
          onClick={() => {
            nav("/mypage");
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
