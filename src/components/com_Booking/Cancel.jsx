import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

import "../../styles/yoonseo/Cancel.css";
import { useContext } from "react";
import { PamphletContext } from "../../App";
import BookingProfile from "./BookingProfile";

const Cancel = () => {
  const { pamphlets } = useContext(PamphletContext);
  return (
    <div className="Cancel">
      <img src={Rectangle16} alt="" className="graybar" />
      <img src={Rectangle19} alt="" className="greenbar" />

      {pamphlets
        .filter((pamphlet) => pamphlet.status === "취소")
        .map((pamphlet, index) => (
          <BookingProfile
            key={pamphlet.id} // key로 index 대신 pamphlet.id를 사용하는 것이 좋습니다
            pamphlet={pamphlet}
            className={`pamphlet pamphlet-${index + 1} pamphlet_cancel`}
          />
        ))}
    </div>
  );
};
export default Cancel;
