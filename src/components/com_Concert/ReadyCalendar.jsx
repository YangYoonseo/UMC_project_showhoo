import Calendar from "react-calendar";
import "../../styles/yoonseo/ReadyCalendar.css";
import "react-calendar/dist/Calendar.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ProfileContext } from "../../App";
import PerformerCalendar from "./PerformerCalendar";

const ReadyCalendar = () => {
  const profiles = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [application, setApplication] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [rental, setRental] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fetchSpaceApplyList = async (selectedDay) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/1/spaceApply/info/${selectedDay}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.result) {
        console.log(selectedDay, "에 대관요청", response.data.result);
        setRental(response.data.result);
      } else {
        console.log("없음");
      }
    } catch (error) {
      console.log("날짜에 따른 공연자 확인 에러", error);
    }
  };

  const handleDateClick = (selectedDate) => {
    const selectedDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    )
      .toISOString()
      .split("T")[0]; // 날짜를 "YYYY-MM-DD" 포맷으로 변환

    // Reset all states
    setShow(false);
    setApplication(false);
    setCompleted(false);
    setSelectedProfile();
    console.log("현재 선택한 날짜", selectedDate);
    console.log("현재 선택 날짜 변환", selectedDay);
    fetchSpaceApplyList(selectedDay);
  };

  useEffect(() => {
    if (rental.length > 0) {
      const selectedDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      )
        .toISOString()
        .split("T")[0];

      if (rental.date === selectedDay) {
        const matchedProfile = profiles.find(
          (profile) => profile.id === 34
          // 임시로 34해놓음 추후에 performerProfileId로 바꿔야 함
        );

        setSelectedProfile(matchedProfile);

        switch (rentalItem.status) {
          case -2:
            setShow(true);
            break;
          case 0:
            setApplication(true);
            break;
          case 1:
            setCompleted(true);
            break;
          default:
            break;
        }
      }
    }
  }, [rental, date, profiles]);

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const day = new Date(date);
      const formattedDate = `${day.getFullYear()}-${(day.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;

      let className = "";
      let text = "";

      rental.forEach((rentalItem) => {
        if (rentalItem.date === formattedDate) {
          switch (rentalItem.status) {
            case -2:
              className = "event event_show";
              text = "공연 완료";
              break;
            case 0:
              className = "event event_application";
              text = "대관 신청";
              break;
            case 1:
              className = "event event_completed";
              text = "대관 완료";
              break;
            default:
              break;
          }
        }
      });

      return <div className={className}>{text}</div>;
    }
    return null;
  };

  return (
    <div className="ReadyCalendar">
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => date.getDate().toString()} // 일 제거 숫자만 보이게
        prev2Label={null}
        next2Label={null}
        calendarType="gregory" // 시작 요일 일요일로 변경
        showNeighboringMonth={false} // 이웃달 안 보여줌
        tileContent={getTileContent}
        onClickDay={handleDateClick} // 클릭된 날짜에 대한 핸들러 추가
      />

      {console.log("프로필", selectedProfile)}
      {console.log("렌트", rental)}

      {(show || completed || application) && (
        <PerformerCalendar
          profile={selectedProfile}
          rental={rental}
          className={"PerformerCalendar PerformerCalendar_calendar"}
        />
      )}
    </div>
  );
};

export default ReadyCalendar;
