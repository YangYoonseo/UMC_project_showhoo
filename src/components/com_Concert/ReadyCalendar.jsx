import Calendar from "react-calendar";
import "../../styles/yoonseo/ReadyCalendar.css";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PerformerCalendar from "./PerformerCalendar";

const ReadyCalendar = () => {
  const url = "https://showhoo.site";
  const token = sessionStorage.getItem("accessToken");
  const spaceUserId = sessionStorage.getItem("spaceUserId");

  const [profile, setProfile] = useState(null); // 초기값 설정
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [application, setApplication] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fullRental, setFullRental] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // 공연 들어온거 띄우기

  useEffect(() => {
    setFullRental([
      {
        id: 5,
        date: "2024-08-23",
        status: 1,
        audienceMin: 10,
        audienceMax: 40,
        rentalSum: 300000,
        spaceName: "test3",
        spaceLocation: "서울 성동구 연희로 36",
        title: "공연예시",
        poster:
          "https://umc-mission.s3.ap-northeast-2.amazonaws.com/spaceRegister/3d453f92-a4aa-4e12-8a52-13c81203983b",
      },
    ]);
  }, []);

  const SpaceApplyProfile = async (spaceApplyId) => {
    try {
      const response = await axios.get(
        `${url}/spaces/spaceApply/info/check/${spaceApplyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("프로필 불러오기 성공", response.data.result);
      setProfile(response.data.result);
    } catch (error) {
      console.log("프로필 불러오기 에러", error);
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
    setSelectedProfile(null);
    console.log("현재 선택한 날짜", selectedDate);
    console.log("현재 선택 날짜 변환", selectedDay);

    // Clicked date에 해당하는 rental 찾기
    const selectedRental = fullRental.find(
      (rentalItem) => rentalItem.date === selectedDay
    );

    if (selectedRental) {
      // rental이 있는 경우, 상태 업데이트
      switch (selectedRental.status) {
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
      // 선택된 rental의 프로필 가져오기
      SpaceApplyProfile(selectedRental.id);
    }
  };

  useEffect(() => {
    if (fullRental && fullRental.length > 0) {
      const selectedDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      )
        .toISOString()
        .split("T")[0];

      fullRental.forEach((rentalItem) => {
        // 각 rentalItem에 대해 처리합니다.
        if (rentalItem.date === selectedDay) {
          const matchedProfile = profile; // profile을 직접 사용함

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
      });
    }
  }, [fullRental, date, profile]);

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const day = new Date(date);
      const formattedDate = `${day.getFullYear()}-${(day.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;

      let className = "";
      let text = "";

      // rental이 배열인지 확인
      if (Array.isArray(fullRental)) {
        fullRental.forEach((rentalItem) => {
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
      }

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
      {console.log("렌트", fullRental)}

      {(show || completed || application) && (
        <PerformerCalendar
          profile={selectedProfile}
          className={"PerformerCalendar PerformerCalendar_calendar"}
        />
      )}
    </div>
  );
};

export default ReadyCalendar;
