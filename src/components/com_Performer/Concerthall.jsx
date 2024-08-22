import "../../styles/yoonseo/Concerthall.css";

import ion_people_outline from "../../assets/img_Performer/ion_people_outline.svg";
import uil_calender from "../../assets/img_Performer/uil_calender.svg";
import Line40 from "../../assets/img_Performer/Line40.svg";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Concerthall = ({ venue, className }) => {
  const url = "https://showhoo.site";
  const nav = useNavigate();

  const getClassName = () => {
    switch (venue.status) {
      case 0:
        return "status_scheduled";
      case 1:
        return "status_completed";
      case -1:
        return "status_no";
      case -2:
        return "status_past";
      default:
        return "";
    }
  };

  const getStateName = () => {
    switch (venue.status) {
      case 0:
        return "승인 예정";
      case 1:
        return "승인 완료";
      case -1:
        return "승인 거절";
      case -2:
        return "지난 공연";
      default:
        return "";
    }
  };

  const PerformerCancel = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${url}/spaceApply/delete/${venue.id}/0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("공연자의 대관 취소 성공");
      window.location.reload();
    } catch (error) {
      console.log("공연자의 대관 취소 에러", error);
    }
  };

  return (
    // className: venue-card venue-${index + 1}
    <div className={className}>
      <img src={venue.spacePhotoUrl} alt="" className="venue_img" />
      <p className={`status ${getClassName()}`}>{getStateName()}</p>
      <div className="venue_div">
        <p className="venue_id">ID {venue.id}</p>
        <img src={Line40} alt="" className="Line41_1" />
        <h2 className="venue_name">{venue.spaceName}</h2>
        <p className="venue_location">{venue.spaceLocation}</p>
        <div className="venue_capacity">
          <img src={ion_people_outline} alt="" />
          <p>
            {venue.audienceMin} ~{venue.audienceMax}명
          </p>
        </div>
        <div className="venue_date">
          <img src={uil_calender} alt="" />
          <p>{venue.date}</p>
        </div>
        <p className="venue_price">￦{venue.rentalSum}</p>
        <img src={Line40} alt="" className="Line41_2" />
        <div className={`venue_button venue_button_${venue.status}`}>
          {venue.status == "0" ? (
            <button className="last_button" onClick={PerformerCancel}>
              취소
            </button>
          ) : null}
          {venue.status == "1" ? (
            <button
              className="prepare_button"
              onClick={() => {
                nav("/performer_ready");
              }}
            >
              준비 시작
            </button>
          ) : null}
          {/* {venue.status == "-2" ? (
            <button className="last_button past_last_button">
              준비과정 보기
            </button>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default Concerthall;
