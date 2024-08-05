import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

import "../../styles/yoonseo/Check.css";

import { useContext } from "react";
import { PamphletContext } from "../../App";
import BookingProfile from "./BookingProfile";

const Check = () => {
  const { pamphlets } = useContext(PamphletContext);
  return (
    <div className="Check">
      <img src={Rectangle19} alt="" className="greenbar" />
      <img src={Rectangle16} alt="" className="graybar" />

      {pamphlets
        .filter((pamphlet) => pamphlet.status !== "취소")
        .map((pamphlet, index) => (
          <BookingProfile
            key={pamphlet.id} // key로 index 대신 pamphlet.id를 사용하는 것이 좋습니다
            pamphlet={pamphlet}
            className={`pamphlet pamphlet-${index + 1}`}
          />
        ))}
    </div>
  );
};

export default Check;
