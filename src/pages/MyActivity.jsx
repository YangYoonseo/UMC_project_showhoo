import "../styles/yoonseo/MyActivity.css";

import { useState } from "react";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Review from "../components/com_Performer/Review";
import Favorite from "../components/com_Performer/Favorite";

const MyActivity = () => {
  const [tab, setTab] = useState("review");

  return (
    <div className="MyActivity">
      <Navbar_Perforemr />
      <div className="MyActivity_content">
        <h1>내 활동</h1>
        <h3
          className={`review review_${tab}`}
          onClick={() => {
            setTab("review");
          }}
        >
          이용 후기
        </h3>
        <h3
          className={`favorite favorite_${tab}`}
          onClick={() => {
            setTab("favorite");
          }}
        >
          관심 목록
        </h3>
        {tab === "review" ? <Review /> : <Favorite />}
      </div>
    </div>
  );
};

export default MyActivity;
