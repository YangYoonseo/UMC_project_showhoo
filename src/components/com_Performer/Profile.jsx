import "../../styles/Profile.css";

import { useNavigate } from "react-router-dom";

import Frame21 from "../../assets/img_Performer/Frame21.png";

const Profile = () => {
  const nav = useNavigate();
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
      <h3>새 프로필</h3>
      <textarea className="school" name="school" placeholder="소속" />
      <textarea className="content" name="content" placeholder="소개" />
      <div>
        <div className="add_img1">
          <p>포스터를 추가하세요</p>
          <p>기기에서 업로드</p>
        </div>
        <div className="add_img2">
          <img src={Frame21} alt="" />
        </div>
        <div className="add_img3">
          <img src={Frame21} alt="" />
        </div>
        <div className="add_img4">
          <img src={Frame21} alt="" />
        </div>
      </div>

      <h4>공연자</h4>

      <div className="add_person">
        <p>멤버를 추가하세요</p>
        <img src={Frame21} alt="" />
      </div>

      <button
        onClick={() => {
          nav("/mypage");
        }}
      >
        완료
      </button>
    </div>
  );
};

export default Profile;
