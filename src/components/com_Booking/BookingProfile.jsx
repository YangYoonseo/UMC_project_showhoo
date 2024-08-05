import "../../styles/yoonseo/BookingProfile.css";
import ticket from "../../assets/img_Booking/ticket.svg";
import ticket_show from "../../assets/img_Booking/ticket_show.svg";
import Button from "../common/Button";
import BookingCancel from "../popup_Booking/BookingCancel";

import { useState } from "react";
import { useContext } from "react";
import { PamphletContext } from "../../App";

const BookingProfile = ({ pamphlet, className }) => {
  const [cancel, setCancel] = useState(false);
  const { cancelPamphlet } = useContext(PamphletContext);

  const onChangePamphlet = () => {
    cancelPamphlet(pamphlet.id);
  };

  const getClassName = () => {
    switch (pamphlet.status) {
      case "공연 완료":
        return "status_show";
      case "승인 예정":
        return "status_schedule";
      case "예매 완료":
        return "status_completed";
      case "취소":
        return "status_cancel";
      default:
        return "";
    }
  };
  const name = getClassName();

  return (
    <div className={className}>
      {name !== "status_completed" && name !== "status_cancel" && (
        <img src={ticket} alt="" className="pamphlet_ticket" />
      )}
      {name === "status_show" && (
        <img src={ticket_show} alt="" className="pamphlet_ticket_show" />
      )}

      <img src={pamphlet.image} alt="" className="pamphlet_image" />
      {name !== "status_cancel" && (
        <p className={`status ${getClassName()}`}>{pamphlet.status}</p>
      )}

      <div className={`pamphlet_div pamphlet_${name}`}>
        <p className="pamphlet_id">ID &nbsp;{pamphlet.id}</p>
        <h3 className="pamphlet_title">{pamphlet.title}</h3>
        <div>
          <div className="pamphlet_div1">
            <p className="pamphlet_location">{pamphlet.location}</p>
            <p className="pamphlet_date">{pamphlet.date}</p>
          </div>
          <div className="pamphlet_div2">
            <p className="pamphlet_club">{pamphlet.club}</p>
            <p className="pamphlet_time">{pamphlet.time}</p>
          </div>
        </div>
      </div>
      {name !== "status_show" && name !== "status_cancel" && (
        <div className="pamphlet_button">
          <Button text={"더 보기"} type={"white"} onClick={() => {}} />
          <Button
            text={"취소"}
            type={"green"}
            onClick={() => {
              setCancel(true);
            }}
          />
        </div>
      )}
      {cancel && (
        <BookingCancel
          onClose={() => {
            setCancel(false);
          }}
          onNext={() => {
            setCancel(false);
            onChangePamphlet();
            console.log(pamphlet);
          }}
        />
      )}
    </div>
  );
};

export default BookingProfile;
