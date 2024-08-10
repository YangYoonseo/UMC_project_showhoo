import "../../styles/Eojin/readyPoster.css";
import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import Editor from "./Editor/Editor";
import SelectCalender from "./Datepicker/calender";
import arrow from "../../assets/img_Ready/arrow.svg";
import { format } from "date-fns"; // 날짜 포맷팅을 위해 가져오기

const ReadyPoster = ({ preStep, nextStep, check }) => {
  const [image, setImage] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [isDatePickerOpen1, setIsDatePickerOpen1] = useState(false);
  const [isDatePickerOpen2, setIsDatePickerOpen2] = useState(false);

  const [formData, setFormData] = useState({
    club: "",
    concertName: "",
    date1: "",
    time1: "",
    runningTime: "",
    date2: "",
    time2: "",
  });

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const handleUploadClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only JPG, JPEG, and PNG files are allowed.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
    setFormData((prevData) => ({
      ...prevData,
      date1: format(date, "yyyy-MM-dd HH:mm"), // 원하는 형식으로 날짜 저장
      time1: date.toLocaleTimeString(), // 원하는 형식으로 시간 저장
    }));
    setIsDatePickerOpen1(false); // 선택 후 DatePicker 닫기
    console.log(formData);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    setFormData((prevData) => ({
      ...prevData,
      date2: format(date, "yyyy-MM-dd HH:mm"), // 원하는 형식으로 날짜 저장
      time2: date.toLocaleTimeString(), // 원하는 형식으로 시간 저장
    }));
    setIsDatePickerOpen2(false); // 선택 후 DatePicker 닫기
    console.log(formData);
  };

  const toggleDatePicker1 = () => {
    setIsDatePickerOpen1(!isDatePickerOpen1);
  };

  const toggleDatePicker2 = () => {
    setIsDatePickerOpen2(!isDatePickerOpen2);
  };

  return (
    <div className="ReadyPoster">
      <div className="Poster_container">
        <div className="Poster_img">
          <h4>공연 포스터</h4>
          <p>포스터 이미지는 표준 종이 규격 (A,B)에 최적화되어 있습니다.</p>
          <p>사진 형식은 JPG,JPEG, PNG만 가능합니다.</p>
          <div className="Poster">
            {!image && (
              <div className="upload-text">
                <p>포스트를 추가하세요.</p>
                <p>
                  <span className="upload-link" onClick={handleUploadClick}>
                    기기에서 업로드
                  </span>
                </p>
              </div>
            )}
            {image && <img src={image} alt="Uploaded" />}
            <input
              type="file"
              id="file-input"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="Poster_inf">
          <h4>공연 정보</h4>
          <p>공연 정보는 등록 이후에 수정할 수 없어요.</p>
          <input
            className="inf_club"
            type="text"
            placeholder="001 클럽"
            onChange={handleChange}
            name="club"
          />
          <input
            className="inf_concertName"
            type="text"
            placeholder="공연명"
            onChange={handleChange}
            name="concertName"
          />
          <div className="inf_date" onClick={toggleDatePicker1}>
            {selectedDate1 ? <p>{formData.date1}</p> : <p>공연 날짜</p>}
            <img className="arrow" src={arrow} alt="arrow" />
          </div>
          {isDatePickerOpen1 && (
            <SelectCalender
              selectedDate={selectedDate1}
              handleDateChange={handleDateChange1}
            />
          )}
          <input
            className="inf_runningTime"
            type="text"
            placeholder="러닝 타임(분 기준)"
            onChange={handleChange}
            name="runningTime"
          />
          <div className="inf_cancel" onClick={toggleDatePicker2}>
            {selectedDate2 ? <p>{formData.date2}</p> : <p>예매 취소 기한</p>}
            <img className="arrow" src={arrow} alt="arrow" />
          </div>
          {isDatePickerOpen2 && (
            <SelectCalender
              selectedDate={selectedDate2}
              handleDateChange={handleDateChange2}
            />
          )}
        </div>
      </div>
      <div className="Detail_Container">
        <h4>공연 상세 내용</h4>
        <p>공연/리허설 과정에서 발생한 내용을 메모하세요.</p>
        <p>이미지는 드래그 앤 드롭으로 첨부 가능해요.</p>
        <div className="editor">
          <Editor />
        </div>
      </div>
      <div className="Poster_button">
        <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
        <Button text={"다음 단계"} type={"green"} onClick={nextStep} />
      </div>
    </div>
  );
};

export default ReadyPoster;
