import "../../styles/yoonseo/AlarmDetail.css";

import Line42 from "../../assets/img_Performer/Line42.png";

import { FaKey, FaTicketAlt } from "react-icons/fa";
import { GiGuitar } from "react-icons/gi"; // 예시 아이콘
// npm install react-icons

const AlarmDetail = ({ id, type, message, timestamp, AlarmDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case "PERFORMER":
        return <FaKey className="icon" />;
      case "SPACEUSER":
        return <FaTicketAlt className="icon" />;
      case "AUDIENCE":
        return <GiGuitar className="icon" />;
      default:
        return <FaKey className="icon" />;
    }
  };

  return (
    <div className="AlarmDetail">
      <div className="icon_wrapper">{getIcon(type)}</div>
      <div className="content">
        <p>{message}</p>
        <span>{timestamp}</span>
      </div>
      <button
        className="close"
        onClick={() => {
          AlarmDelete(id);
        }}
      >
        X
      </button>
      <img src={Line42} alt="" />
    </div>
  );
};

export default AlarmDetail;
