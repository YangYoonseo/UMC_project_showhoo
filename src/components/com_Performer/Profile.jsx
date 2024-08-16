import "../../styles/yoonseo/Profile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import Button from "../common/Button";
import Frame21 from "../../assets/img_Performer/Frame21.svg";
import TrashIcon from "../../assets/img_Performer/TrashIcon.svg";

// 이미지 불러오기 기능, 이미지 추가 기능 구현 필요!

const uploadImage = async (imageFile) => {
  const token = sessionStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("profileImages", imageFile);

  try {
    const response = await axios.post(
      "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/profileImage/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Upload response:", response.data.result);
    return response.data.result[0];
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

const Profile = ({ profile = {} }) => {
  const nav = useNavigate();
  const [title, setTitle] = useState(profile.team || "");
  const [school, setSchool] = useState(profile.name || "");
  const [number, setNumber] = useState(profile.phoneNumber || "");
  const [information, setInformation] = useState(profile.introduction || "");
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    setSchool(profile.name || "");
    setInformation(profile.introduction || "");
    setTitle(profile.team || "");
    setNumber(profile.phoneNumber || "");
  }, []);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const updateImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + uploadedImages.length > 4) {
      alert("최대 4개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    setUploadedImages((prevImages) => [...prevImages, ...files].slice(0, 4));
  };

  const removeImages = (index) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const submitProfile = async () => {
    const token = sessionStorage.getItem("accessToken");
    const profileId = profile.id;

    try {
      // 이미지 업로드 및 URL 추출
      const imagePromises = uploadedImages.map(
        (image) => uploadImage(image) // 이미지 파일을 업로드하고 URL을 받음
      );

      const imageUrls = await Promise.all(imagePromises);

      const data = {
        team: title,
        name: school,
        introduction: information,
        phoneNumber: number,
        profileImageUrls: imageUrls, // 프로필 이미지 URL로 수정
      };

      const url = profileId
        ? `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/profile/1/${profileId}/text`
        : "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/profile/1";

      const method = profileId ? "put" : "post";

      const response = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile successfully registered:", response.data);
      // addProfile(response.data);
      nav("/mypage_performer");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderImagePreview = (index) => {
    return (
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
              src={URL.createObjectURL(uploadedImages[index])}
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
                src={URL.createObjectURL(uploadedImages[0])}
                alt="uploaded 1"
                className="add_img1"
              />
              <img
                src={TrashIcon}
                alt="delete"
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
        <div className="add_img_container">
          {[1, 2, 3].map((index) => (
            <div key={index}>{renderImagePreview(index)}</div>
          ))}
        </div>

        <Button text={"완료"} type={"green"} onClick={submitProfile} />
      </div>
    </div>
  );
};

export default Profile;
