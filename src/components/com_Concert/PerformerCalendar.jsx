import "../../styles/yoonseo/PerformerCalendar.css";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const token = sessionStorage.getItem("accessToken");

  const url = "https://showhoo.site";

  const [ok, setOk] = useState(false);
  const [refuse, setRefuse] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [receipt2, setReceipt2] = useState(false);

  const getClassName = () => {
    if (rental) {
      const status = rental.status;
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
    if (rental) {
      const status = rental.status;
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

  // 대관 수락
  const PatchOk = async () => {
    try {
      const response = await axios.patch(
        `${url}/spaces/${rental.id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("수락 성공");
    } catch (error) {
      console.log("수락 에러", error);
    }
  };

  const OkNext = () => {
    PatchOk();
    setOk(false);
  };

  // 대관 거절
  const PatchRefuse = async () => {
    try {
      const response = await axios.delete(
        `${url}/spaceApply/delete/${rental.id}/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("거절 성공");
    } catch (error) {
      console.log("거절 에러", error);
    }
  };

  const RefuseNext = () => {
    PatchRefuse();
    setRefuse(false);
  };

  if (!profile) {
    // profile이 없을 경우 렌더링하지 않거나 대체 UI를 제공할 수 있습니다.
    return <div className={className}>Profile information is missing.</div>;
  }

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
        src={profile.profileImageUrls[0] || { Frame22 }} // 프로필 이미지 URL이 없을 경우 대체 URL 사용
        alt="Profile"
        className="profile_img"
      />
      {console.log("선택된", rental)}
      <p className={`status ${getClassName()}`}>{getStatus()}</p>
      <div className="performerCalendar_div">
        <h3>{profile.name}</h3>
        <p className="school_p">{profile.team}</p>
        <div className="people">
          <img src={ion_people_outline} alt="" />
          <p>
            예상 관람객 {rental.audienceMin} ~ {rental.audienceMax}명
          </p>
        </div>
        {/* <div className="service">
          <img src={Frame22} alt="" />
          <p>추가 서비스 택 </p>
        </div> */}
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
          <Button
            text={"준비 과정 보기"}
            type={"gray"}
            onClick={() => {
              nav("/con_ready", { state: rental });
            }}
          />
        )}

        {getStatus() === "대관 완료" && (
          <Button
            text={"준비 시작"}
            type={"black"}
            onClick={() => {
              nav("/con_ready", { state: rental });
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
          onNext={OkNext}
        />
      )}
      {refuse && (
        <RentalRefuse
          title={profile.name}
          onClose={() => {
            setRefuse(false);
          }}
          onNext={RefuseNext}
        />
      )}
      {receipt && (
        <ConcertReceipt
          rental={rental}
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
          id={rental.id}
          profile={profile}
          date={rental.date}
        />
      )}
    </div>
  );
};
export default PerformerCalendar;
