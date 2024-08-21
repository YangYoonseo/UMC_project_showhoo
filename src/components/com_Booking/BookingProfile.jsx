import "../../styles/yoonseo/BookingProfile.css";

import { useState } from "react";
import axios from "axios";

import ticket from "../../assets/img_Booking/ticket.svg";
import ticket_show from "../../assets/img_Booking/ticket_show.svg";
import BookingCancel from "../popup_Booking/BookingCancel";
import Button from "../common/Button";

const BookingProfile = ({ pamphlet, className }) => {
  const [cancelPopup, setCancelPopup] = useState(false);

  const getClassName = () => {
    switch (pamphlet.detail) {
      case "WATCHED":
        return "status_show";
      case "CONFIRMING":
        return "status_schedule";
      case "CONFIRMED":
        return "status_completed";
      case "CANCELLING":
        return "status_canceling";
      case "CANCELED":
        return "status_cancel";
      default:
        return "";
    }
  };
  const name = getClassName();

  const getStatus = () => {
    switch (pamphlet.detail) {
      case "WATCHED":
        return "공연 완료";
      case "CONFIRMING":
        return "승인 예정";
      case "CONFIRMED":
        return "예매 완료";
      case "CANCELLING":
        return "취소 대기";
      case "CANCELED":
        return "취소 완료";
      default:
        return "";
    }
  };
  const status = getStatus();

  return (
    <div className={className}>
      {name !== "status_completed" && name !== "status_cancel" && (
        <img src={ticket} alt="" className="pamphlet_ticket" />
      )}
      {name === "status_show" && (
        <img src={ticket_show} alt="" className="pamphlet_ticket_show" />
      )}

      <img src={pamphlet.poster} alt="" className="pamphlet_image" />
      {name !== "status_cancel" && (
        <p className={`status ${getClassName()}`}>{status}</p>
      )}

      <div className={`pamphlet_div pamphlet_${name}`}>
        <p className="pamphlet_id">ID &nbsp;{pamphlet.bookId}</p>
        <h3 className="pamphlet_title">{pamphlet.name}</h3>
        <div>
          <div className="pamphlet_div1">
            <p className="pamphlet_performer">{pamphlet.performer}</p>
            <p className="pamphlet_date">{pamphlet.date}</p>
          </div>
          <div className="pamphlet_div2">
            <p className="pamphlet_place">{pamphlet.place}</p>
            <p className="pamphlet_time">{pamphlet.time}</p>
          </div>
        </div>
      </div>
      {name !== "status_show" &&
        name !== "status_canceling" &&
        name !== "status_cancel" && (
          <div className="pamphlet_button">
            <Button text={"더 보기"} type={"white"} onClick={() => {}} />
            <Button
              text={"취소"}
              type={"green"}
              onClick={() => {
                setCancelPopup(true);
              }}
            />
          </div>
        )}
      {cancelPopup && (
        <BookingCancel
          onClose={() => {
            setCancelPopup(false);
          }}
          id={pamphlet.bookId}
        />
      )}
    </div>
  );
};

export default BookingProfile;
