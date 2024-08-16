import "../styles/yoonseo/MypageConcert.css";

import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_Concert from "../components/common/Navbar_Concert";

import PerformerCancel from "../components/popup_Performer/PerformerCancel";
import SwitchRoles from "../components/common/SwitchRoles";

const MypageConcert = () => {
  const nav = useNavigate();
  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [myprofile, setMyprofile] = useState();

  useEffect(() => {
    const MypageView = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/space-user/mypage/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("마이프로필", response.data.result);
        setMyprofile(response.data.result);
      } catch (error) {
        console.error("프로필 정보를 불러오는데 실패했습니다:", error);
      }
    };
    MypageView();
  }, []);

  if (!myprofile) {
    return <div>Loading...</div>;
  }

  const fullName = myprofile.name;

  return (
    <div className="MypageConcert">
      <Navbar_Concert />
      <div className="MypageConcert_content">
        <h3>마이페이지</h3>
        <img src={myprofile.profileimage} alt="" className="profile_img" />
        <p className="name">{fullName}</p>

        <div className="choice">
          <button
            onClick={() => {
              nav("/alarm_concert");
            }}
          >
            알림
          </button>
          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            역할 전환
          </button>
          <button>로그아웃</button>
          <button
            onClick={() => {
              setCancel(true);
            }}
          >
            회원탈퇴
          </button>
        </div>
      </div>
      {cancel && <PerformerCancel onClose={() => setCancel(false)} />}
      {popup && (
        <SwitchRoles
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default MypageConcert;
