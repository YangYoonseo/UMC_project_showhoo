import axios from "axios";
import "./Login.css";
import Navbar_Perforemr from "./components/common/Navbar_Performer";
import kakao from "./assets/images/kakao_login_large_wide.png";
import { useNavigate } from "react-router-dom";

const url = "https://showhoo.site";
const dev = "http://localhost:8080";

async function kakaoLogin() {
  const endpoint = "/kakao";

  const inst = axios.create({
    baseURL: url,
    withCredentials: true,
  });
  try {
    const res = await inst.get(endpoint);
    //console.log(res.data);
    window.location.href = res.data;
  } catch (err) {
    console.log(err);
  }
}

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

//400 BAD REQUEST
async function kakaoWithdraw() {
  const endpoint = "/kakao/delete";
  const token = sessionStorage.getItem("accessToken");
  const uid = sessionStorage.getItem("uid");
  console.log(uid + " and " + typeof uid);
  console.log(typeof parseInt(uid));

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
        //redirectToLogin();
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

/*
        1. 클라이언트 > /kakao > 서버
            서버 > loginUrl > 클라이언트
            클라이언트 : window.location.href = loginUrl
            카카오 측 : 클라이언트에게 코드 반환

        2. 클라이언트 > /login?code=* > 서버
            서버 : 로그인 작업
            서버 > jwt 토큰 > 클라이언트
    */

async function getToken(code, navigate) {
  try {
    const response = await axios.get(url + "/login/oauth2/code/kakao", {
      params: { code }, // 서버로 전달할 'code' 파라미터
      withCredentials: true, // 세션 쿠키를 포함시켜 요청
    });

    // 서버로부터 받은 데이터 처리
    console.log("Login Success:", response.data);
    //jwt 토큰 session storage 등에 저장
    sessionStorage.setItem("accessToken", response.data.token.accessToken);
    sessionStorage.setItem("name", response.data.name);
    sessionStorage.setItem("uid", response.data.id);
    //sessionStorage.setItem('refreshToken', response.data.token.refreshToken);
    navigate("/");
    alert(response.data.name + "님, 어서오세요");
  } catch (err) {
    console.log(err);
  }
}

async function fetchData() {
  const token = sessionStorage.getItem("accessToken");

  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${token}` },
  });

  instance.interceptors.response.use(
    (response) => response.data,
    async function (error) {
      if (error.response?.status === 401) {
        alert("로그인 필요");
        //redirectToLogin();
      } else {
        throw error;
      }
    }
  );

  try {
    const res = await instance.get(url + "/login", {
      withCredentials: true,
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

function Login() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  //console.log(code)
  if (code !== null) {
    //code 여러 번 넣으면 서버에서 에러 남 -> 한 번에 쭉 실행될 수 있도록!
    getToken(code, navigate);
  }

  const handleWithdraw = () => {
    kakaoWithdraw();
  };

  const handleLogin = () => {
    console.log("로그인");
    kakaoLogin();
  };

  const handletest = () => {
    fetchData();
  };

  const handleLogout = () => {
    console.log("로그아웃");
    kakaoLogout();
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="loginPage">
      <Navbar_Perforemr></Navbar_Perforemr>
      <button className="closeButton" onClick={handleClose}>
        x
      </button>
      <div className="loginBack">
        <div className="loginBox">
          <div className="loginTitle">
            <div>
              <span style={{ color: "aquamarine" }}>ShowHoo</span> 에 오신 걸
            </div>
            <br />
            <div>환영합니다</div>
          </div>
          <img
            className="kakaoButton"
            src={kakao}
            alt="카카오 로그인 이미지"
            onClick={handleLogin}
          />
          <div className="agree" onClick={handletest}>
            쇼호 서비스 약관
          </div>
          <div className="agree" onClick={handleLogout}>
            쇼호 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
