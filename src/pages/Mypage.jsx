import "../styles/yoonseo/Mypage.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import PerformerProfile from "../components/com_Performer/PerformerProfile";
import PerformerCancel from "../components/popup_Performer/PerformerCancel";
import SwitchRoles from "../components/common/SwitchRoles";

const Mypage = () => {
  const url = "https://showhoo.site";
  const nav = useNavigate();
  const performerId = sessionStorage.getItem("performerId");
  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [myprofile, setMyprofile] = useState();
  const [latestProfile, setLatestProfile] = useState({});

  useEffect(() => {
    const MypageView = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${url}/performer/mypage/${performerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("마이프로필", response.data.result);
        if (response.data.result) {
          setMyprofile(response.data.result);
        }

        const profileDTO = response.data.result.profileDTO;

        if (profileDTO) {
          setLatestProfile({
            id: profileDTO.id || "",
            introduction: profileDTO.introduction || "",
            name: profileDTO.name || "",
            phoneNumber: profileDTO.phoneNumber || "",
            profileImages: profileDTO.profileImages || [],
            team: profileDTO.team || "",
            date: profileDTO.createdAt.split("T")[0] || "",
          });
        } else {
          // Handle the case where profileDTO is not available
          setLatestProfile({
            id: "",
            introduction: "",
            name: "최근 프로필이 없습니다",
            phoneNumber: "",
            profileImages: [],
            team: "",
            date: "",
          });
        }
      } catch (error) {
        console.error("최근 프로필 정보를 불러오는데 실패했습니다:", error);
      }
    };
    MypageView();
  }, []);

  async function kakaoLogout() {
    const endpoint = "/kakao/logout/withAccount";
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const res = await axios.get(url + endpoint);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("uid");
        window.location.href = res.data;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function kakaoWithdraw() {
    const endpoint = "/kakao/delete";
    const token = sessionStorage.getItem("accessToken");
    const uid = sessionStorage.getItem("uid");

    const instance = axios.create({
      baseURL: "http://localhost:8080",
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    instance.interceptors.response.use(
      (response) => response.data,
      async function (error) {
        if (error.response?.status === 401) {
          alert("로그인 필요");
        } else {
          throw error;
        }
      }
    );

    try {
      const res = await instance.post(endpoint, {
        uid: parseInt(sessionStorage.getItem("uid")),
      });

      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("uid");

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    console.log("로그아웃");
    kakaoLogout();
  };

  const handleWithdraw = () => {
    kakaoWithdraw();
    setCancel(false);
  };

  if (!myprofile) {
    return <div>Loading...</div>;
  }

  const fullName = myprofile.name || "";
  const name = fullName.substring(1) || "";

  return (
    <div className="Mypage">
      <Navbar_Perforemr />
      <div className="Mypage_content">
        <h3>마이페이지</h3>
        <img src={myprofile.profileimage} alt="" className="profile_img" />
        <p className="name">{fullName}</p>
        <p className="latest">
          {name}님의<span>&nbsp;최근&nbsp;</span>프로필이에요
        </p>
        {console.log("제일 최근", latestProfile)}
        {latestProfile && (
          <PerformerProfile
            key={latestProfile.id}
            profile={latestProfile}
            className={"profile-card profile-latest"}
          />
        )}

        <div className="choice">
          <button
            onClick={() => {
              nav("/alarm");
            }}
          >
            알림
          </button>
          <button
            onClick={() => {
              nav("/performer_registration");
            }}
          >
            공연자 등록
          </button>
          <button
            onClick={() => {
              nav("/rental_history");
            }}
          >
            대관내역
          </button>
          <button
            onClick={() => {
              nav("/my_activity");
            }}
          >
            내 활동
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
        {cancel && <PerformerCancel onClose={handleWithdraw} />}
        {popup && (
          <SwitchRoles
            onClose={() => {
              setPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Mypage;
