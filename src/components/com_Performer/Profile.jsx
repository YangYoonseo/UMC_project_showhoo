import "../../styles/yoonseo/Profile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Button from "../common/Button";
import Frame21 from "../../assets/img_Performer/Frame21.svg";
import TrashIcon from "../../assets/img_Performer/TrashIcon.svg";

const Profile = ({ profile = {} }) => {
  const url = "https://showhoo.site";
  const token = sessionStorage.getItem("accessToken");
  const performerId = sessionStorage.getItem("performerId");

  const nav = useNavigate();
  const [title, setTitle] = useState(profile.team || "");
  const [school, setSchool] = useState(profile.name || "");
  const [number, setNumber] = useState(profile.phoneNumber || "");
  const [information, setInformation] = useState(profile.introduction || "");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(
    profile.profileImages || []
  );

  useEffect(() => {
    setSchool(profile.team || "");
    setInformation(profile.introduction || "");
    setTitle(profile.name || "");
    setNumber(profile.phoneNumber || "");
    setExistingImages(profile.profileImages || []);
  }, []);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // 이미지 등록
  const updateImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + uploadedImages.length + existingImages.length > 4) {
      alert("최대 4개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    const newUploadedImages = [...uploadedImages, ...files].slice(
      0,
      4 - existingImages.length
    );
    console.log("New Uploaded Images:", newUploadedImages); // 디버깅 로그
    setUploadedImages(newUploadedImages);
  };

  // 이미지 삭제_API
  const deleteImage = async (imageUrl) => {
    try {
      await axios.delete(`${url}/profile/profileImage`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          profileImageUrl: imageUrl,
        },
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // 이미지 등록_API
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("profileImages", imageFile);

    try {
      const response = await axios.post(
        `${url}/profileImage/upload`,
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

  // 수정 시 이미지 등록
  const updateImage = async (imageFile) => {
    const profileId = profile.id; // 프로필 ID를 가져와야 합니다

    if (!profileId) {
      throw new Error("Profile ID is required for image update");
    }

    const formData = new FormData();
    formData.append("profileImage", imageFile); // 'profileImage' 키에 파일 추가

    try {
      const response = await axios.post(
        `${url}/profile/${performerId}/${profileId}/profileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Image update response:", response.data);
      return response.data; // 필요한 데이터가 무엇인지 확인하여 반환값을 설정합니다
    } catch (error) {
      console.error("Image update failed:", error);
      throw error;
    }
  };

  const removeImages = async (index) => {
    if (index < existingImages.length) {
      const imageUrl = existingImages[index].profileImageUrl;
      await deleteImage(imageUrl); // 서버에서 이미지 삭제
      setExistingImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    } else {
      const newIndex = index - existingImages.length;
      setUploadedImages((prevImages) =>
        prevImages.filter((_, i) => i !== newIndex)
      );
    }
  };

  // 제출_API
  const submitProfile = async () => {
    const profileId = profile.id;

    try {
      let newImageUrls = [];

      if (profileId) {
        // 프로필이 존재하는 경우, 새로 업로드된 이미지를 업데이트합니다.
        const updatePromises = uploadedImages.map((image) =>
          updateImage(image)
        );
        newImageUrls = await Promise.all(updatePromises);
      } else {
        // 새 프로필인 경우, 이미지를 업로드하고 URL을 가져옵니다.
        const uploadPromises = uploadedImages.map((image) =>
          uploadImage(image)
        );
        newImageUrls = await Promise.all(uploadPromises);
      }

      // 기존 이미지와 새로 업로드된 이미지 URL을 합칩니다.
      const allImageUrls = [
        ...existingImages.map((img) => img.profileImageUrl),
        ...newImageUrls,
      ];

      // 프로필 데이터 객체 생성
      const data = {
        name: title,
        team: school,
        introduction: information,
        phoneNumber: number,
        profileImageUrls: allImageUrls,
      };

      // 프로필 ID가 있는 경우 PUT 요청, 없는 경우 POST 요청
      const url = profileId
        ? `https://showhoo.site/profile/${performerId}/${profileId}/text`
        : `https://showhoo.site/profile/${performerId}`;

      const method = profileId ? "put" : "post";

      // 프로필 데이터 전송
      await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // 성공적으로 제출한 후, 페이지 이동
      nav("/mypage_performer");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderImagePreview = (index) => {
    let imageUrl;
    if (index < existingImages.length) {
      imageUrl = existingImages[index].profileImageUrl; // 기존 이미지 URL 사용
    } else {
      const newIndex = index - existingImages.length;
      const file = uploadedImages[newIndex];
      imageUrl = file ? URL.createObjectURL(file) : ""; // 새로 업로드된 이미지에 대해 createObjectURL 사용
    }

    return (
      <div key={index}>
        {imageUrl ? (
          <div>
            <img
              src={imageUrl}
              alt={`uploaded ${index + 1}`}
              className={`add_img${index + 1}`}
              onError={(e) => (e.target.src = Frame21)} // 이미지 로드 오류 시 기본 이미지로 대체
            />
            <img
              src={TrashIcon}
              alt="delete"
              className={`delete delete_img${index + 1}`}
              onClick={() => removeImages(index)}
            />
          </div>
        ) : (
          <div className={`add_img${index + 1}`}>
            <label htmlFor={`imageUpload${index}`}>
              <img src={Frame21} alt={`프레임 이미지 ${index + 1}`} />
            </label>
            <input
              type="file"
              accept="image/*"
              id={`imageUpload${index}`}
              style={{ display: "none" }}
              onChange={(e) => updateImages(e)}
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
          {existingImages.length === 0 && uploadedImages.length === 0 ? (
            <div className="add_img1">
              <p>포스터를 추가하세요</p>
              <label htmlFor="imageUpload">
                <div className="upload_button">기기에서 업로드</div>
              </label>
            </div>
          ) : (
            renderImagePreview(0)
          )}
        </div>

        {/* 이미지 업로드 input */}
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          style={{ display: "none" }}
          onChange={(e) => updateImages(e)}
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
