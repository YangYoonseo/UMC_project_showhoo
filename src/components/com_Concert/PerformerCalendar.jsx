import "../../styles/yoonseo/PerformerCalendar.css";
import Button from "../common/Button";
import { useState } from "react";
import RentalApproval from "../popup_Concert/RentalApproval";
import RentalRefuse from "../popup_Concert/RentalRefuse";
import ConcertReceipt from "./ConcertReceipt";

import ion_people_outline from "../../assets/img_Performer/ion_people_outline.png";
import Frame22 from "../../assets/img_Performer/Frame22.png";
import Line40 from "../../assets/img_Performer/Line40.png";

const PerformerCalendar = ({ profile, className }) => {
  const [ok, setOk] = useState(false);
  const [refuse, setRefuse] = useState(false);
  const [receipt, setReceipt] = useState(false);

  const getClassName = () => {
    switch (profile.status) {
      case "공연 완료":
        return "status_show";
      case "대관 신청":
        return "status_application";
      case "대관 완료":
        return "status_completed";
      default:
        return "";
    }
  };

  return (
    <div
      className={className}
      onClick={() => {
        setReceipt(true);
      }}
    >
      <img src={profile.image} alt="Profile" className="profile_img" />
      <p className={`status ${getClassName()}`}>{profile.status}</p>
      <div className="performerCalendar_div">
        <h3>{profile.title}</h3>
        <p className="school_p">{profile.school}</p>
        <div className="people">
          <img src={ion_people_outline} alt="" />
          <p>예상 관람객 80~100명</p>
        </div>
        <div className="service">
          <img src={Frame22} alt="" />
          <p>추가 서비스 택 4</p>
        </div>
        <img src={Line40} alt="" className="line" />
      </div>
      <div className="performerCalendar_button">
        {profile.status === "대관 신청" && (
          <>
            <Button
              text={"거절"}
              type={"gray"}
              onClick={() => {
                setRefuse(true);
              }}
            />
            <Button
              text={"승인"}
              type={"green"}
              onClick={() => {
                setOk(true);
              }}
            />{" "}
          </>
        )}

        {profile.status === "공연 완료" && (
          <Button text={"준비 과정 보기"} type={"gray"} />
        )}

        {profile.status === "대관 완료" && (
          <Button text={"준비 시작"} type={"black"} />
        )}
      </div>
      {ok && (
        <RentalApproval
          title={profile.title}
          onClose={() => {
            setOk(false);
          }}
          //   추후 수정 필요, 승인단계 안 되었음
          onNext={() => {
            setOk(false);
          }}
        />
      )}
      {refuse && (
        <RentalRefuse
          title={profile.title}
          onClose={() => {
            setRefuse(false);
          }}
          onNext={() => {
            setRefuse(false);
          }}
        />
      )}
      {receipt && (
        <ConcertReceipt
          profile={profile}
          onClose={() => {
            setReceipt(false);
          }}
        />
      )}
    </div>
  );
};
export default PerformerCalendar;
