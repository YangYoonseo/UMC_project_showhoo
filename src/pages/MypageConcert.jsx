import "../styles/yoonseo/MypageConcert.css";

import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_Concert from "../components/common/Navbar_Concert";

import PerformerCancel from "../components/popup_Performer/PerformerCancel";
import SwitchRoles from "../components/common/SwitchRoles";

const MypageConcert = () => {
  const url = "https://showhoo.site";
  const spaceUserId = sessionStorage.getItem("audienceId");
  const nav = useNavigate();
  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [myprofile, setMyprofile] = useState();

  useEffect(() => {
    const MypageView = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${url}/space-user/mypage/${spaceUserId}`,
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

  async function kakaoLogout() {
    const endpoint = "/kakao/logout/withAccount";
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const res = await axios.get(url + endpoint);
        //console.log(res.data);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("uid");
        window.location.href = res.data;
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleLogout = () => {
    console.log("로그아웃");
    kakaoLogout();
  };

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
          <button onClick={handleLogout}>로그아웃</button>
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
