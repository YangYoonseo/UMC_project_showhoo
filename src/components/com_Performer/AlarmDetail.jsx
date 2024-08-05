import "../../styles/yoonseo/AlarmDetail.css";

import Line42 from "../../assets/img_Performer/Line42.png";

import { FaKey, FaTicketAlt } from "react-icons/fa"; // 예시 아이콘
// npm install react-icons

const AlarmDetail = ({ type, message, timestamp }) => {
  const getIcon = (type) => {
    switch (type) {
      case "comment":
        return <FaKey className="icon" />;
      case "ticket":
        return <FaTicketAlt className="icon" />;
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
      <button className="close">X</button>
      <img src={Line42} alt="" />
    </div>
  );
};

export default AlarmDetail;
