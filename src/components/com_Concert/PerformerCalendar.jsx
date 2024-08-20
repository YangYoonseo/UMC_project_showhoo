import "../../styles/yoonseo/PerformerCalendar.css";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RentalApproval from "../popup_Concert/RentalApproval";
import RentalRefuse from "../popup_Concert/RentalRefuse";
import ConcertReceipt from "./ConcertReceipt";
import Receipt from "./Receipt";

import ion_people_outline from "../../assets/img_Performer/ion_people_outline.svg";
import Frame22 from "../../assets/img_Performer/Frame22.svg";
import Line40 from "../../assets/img_Performer/Line40.svg";

const PerformerCalendar = ({ profile, rental, className }) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const [refuse, setRefuse] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [receipt2, setReceipt2] = useState(false);
  const [selectedRental, setSelectedRental] = useState();

  useEffect(() => {
    if (profile && rental) {
      const matchedRental = rental.find(
        (rent) => rent.performerId === profile.id
      );
      setSelectedRental(matchedRental);
      setLoading(false);
    }
  }, [profile, rental]);

  if (loading) {
    return <div>로딩 중입니다...</div>;
  }

  const getClassName = () => {
    if (selectedRental) {
      const status = selectedRental.status;
      switch (status) {
        case -2:
          return "status_show";
        case 0:
          return "status_application";
        case 1:
          return "status_completed";
        default:
          return "";
      }
    }
    return "";
  };

  const getStatus = () => {
    if (selectedRental) {
      const status = selectedRental.status;
      switch (status) {
        case -2:
          return "공연 완료";
        case 0:
          return "대관 신청";
        case 1:
          return "대관 완료";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div
      className={className}
      onClick={() => {
        if (!receipt2 && !ok && !refuse) {
          setReceipt(true);
        }
      }}
    >
      <img
        src={profile.profileImages[0].profileImageUrl}
        alt="Profile"
        className="profile_img"
      />
      {console.log("선택된", selectedRental)}
      <p className={`status ${getClassName()}`}>{getStatus()}</p>
      <div className="performerCalendar_div">
        <h3>{profile.name}</h3>
        <p className="school_p">{profile.team}</p>
        <div className="people">
          <img src={ion_people_outline} alt="" />
          <p>
            예상 관람객 {selectedRental.audienceMin} ~{" "}
            {selectedRental.audienceMax}명
          </p>
        </div>
        <div className="service">
          <img src={Frame22} alt="" />
          <p>추가 서비스 택 </p>
        </div>
        <img src={Line40} alt="" className="line" />
      </div>
      <div className="performerCalendar_button">
        {getStatus() === "대관 신청" && (
          <>
            <Button
              text={"거절"}
              type={"gray"}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 전파 막기
                setRefuse(true);
              }}
            />
            <Button
              text={"승인"}
              type={"green"}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 전파 막기
                setOk(true);
              }}
            />{" "}
          </>
        )}

        {getStatus() === "공연 완료" && (
          <Button text={"준비 과정 보기"} type={"gray"} />
        )}

        {getStatus() === "대관 완료" && (
          <Button
            text={"준비 시작"}
            type={"black"}
            onClick={() => {
              nav("/con_ready");
            }}
          />
        )}
      </div>
      {ok && (
        <RentalApproval
          title={profile.name}
          onClose={() => {
            setOk(false);
          }}
          //   추후 수정 필요, 승인단계 안 되었음
          onNext={() => {
            setOk(false);
          }}
          id={selectedRental.id}
        />
      )}
      {refuse && (
        <RentalRefuse
          title={profile.name}
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
            setReceipt2(false); // 이 부분 수정
            console.log(1);
          }}
          onNext={() => {
            setReceipt(false);
            setReceipt2(true); // 이 부분 수정
            console.log(2);
          }}
        />
      )}
      {receipt2 && (
        <Receipt
          profile={profile}
          onPre={() => {
            setReceipt(true); // 이 부분 수정
            setReceipt2(false); // 이 부분 수정
            console.log(3);
          }}
          onNext={() => {
            setReceipt(false);
            setReceipt2(false); // 이 부분 수정
            console.log(4);
          }}
        />
      )}
    </div>
  );
};
export default PerformerCalendar;
