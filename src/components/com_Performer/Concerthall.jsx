import "../../styles/yoonseo/Concerthall.css";

import ion_people_outline from "../../assets/img_Performer/ion_people_outline.png";
import uil_calender from "../../assets/img_Performer/uil_calender.png";
import Line40 from "../../assets/img_Performer/Line40.png";
import { useNavigate } from "react-router-dom";

const Concerthall = ({ venue, className }) => {
  const getClassName = () => {
    switch (venue.status) {
      case "승인 예정":
        return "status_scheduled";
      case "승인 완료":
        return "status_completed";
      case "지난 공연":
        return "status_past";
      default:
        return "";
    }
  };

  return (
    // className: venue-card venue-${index + 1}
    <div className={className}>
      <img src={venue.image} alt="" className="venue_img" />
      <p className={`status ${getClassName()}`}>{venue.status}</p>
      <div className="venue_div">
        <p className="venue_id">ID {venue.id}</p>
        <img src={Line40} alt="" className="Line41_1" />
        <h2 className="venue_name">{venue.name}</h2>
        <p className="venue_location">{venue.location}</p>
        <div className="venue_capacity">
          <img src={ion_people_outline} alt="" />
          <p>{venue.capacity}</p>
        </div>
        <div className="venue_date">
          <img src={uil_calender} alt="" />
          <p>{venue.date}</p>
        </div>
        <p className="venue_price">{venue.price}</p>
        <img src={Line40} alt="" className="Line41_2" />
        <div className="venue_button">
          <button className="more_button">더 보기</button>
          {venue.status == "승인 예정" ? (
            <button className="last_button">취소</button>
          ) : null}
          {venue.status == "승인 완료" ? (
            <button className="prepare_button" onClick={()=>{nav("/concert_ready");}}>공연 준비</button>
          ) : null}
          {venue.status == "지난 공연" ? (
            <button className="last_button">삭제</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Concerthall;
