import "../../styles/Eojin/readyPoster.css";
import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // 날짜 포맷팅을 위해 가져오기
import axios from "axios";

import Button from "../common/Button";
import Editor from "./Editor/Editor";
import SelectCalender from "./Datepicker/calender";

import arrow from "../../assets/img_Ready/arrow.svg";

const ReadyPoster = ({ preStep, nextStep, check }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [isDatePickerOpen1, setIsDatePickerOpen1] = useState(false);
  const [isDatePickerOpen2, setIsDatePickerOpen2] = useState(false);
  // CKEditor에서 받아올 데이터 
  const [descriptionDTO, setDescriptionDTO] = useState('');
  const [imgData, setImgData] = useState(new FormData());

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    runningTime: "",
    cancelDate: "",
    cancelTime: "",
  });

  const handleUploadClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setImage(file);
        getPosterUrl();
    } else {
        alert("Only JPG, JPEG, and PNG files are allowed.");
    }
  };

const getPosterUrl = async () => {
    const token = sessionStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("poster", image);  // 'file'은 서버에서 기대하는 파일 필드 이름입니다.

    try {
        const res = await axios.post(
            `https://showhoo.site/upload-poster`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.data.isSuccess) {
          const posterUrl = res.data.result.poster;
          console.log("업로드 성공:", posterUrl);
          setImageUrl(posterUrl);  // 서버에서 반환된 이미지 URL을 저장
      } else {
          console.error("업로드 실패:", res.data.message);
          alert(`Upload failed: ${res.data.message}`);
      }
  } catch (error) {
      console.error("업로드 실패:", error);
      alert("An error occurred during the upload.");
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
      date: format(date, "yyyy-MM-dd HH:mm"), // 원하는 형식으로 날짜 저장
      time: date.toLocaleTimeString(), // 원하는 형식으로 시간 저장
    }));
    setIsDatePickerOpen1(false); // 선택 후 DatePicker 닫기
    console.log(formData);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    setFormData((prevData) => ({
      ...prevData,
      cancelDate: format(date, "yyyy-MM-dd HH:mm"), // 원하는 형식으로 날짜 저장
      cancelTime: date.toLocaleTimeString(), // 원하는 형식으로 시간 저장
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

  const performerProfileId = 1;

  const uploadInf = async () => {
    const token = sessionStorage.getItem("accessToken");

    // FormData 객체 생성
    const formDataToSend = new FormData();

    // showRequestDTO 객체를 FormData에 추가
    formDataToSend.append("showRequestDTO", new Blob([JSON.stringify(formData)], { type: "application/json" }));

    // poster 이미지 URL을 FormData에 추가
    formDataToSend.append("poster", imageUrl);

    try {
        const res = await axios.post(
            `https://showhoo.site/${performerProfileId}/show-register`,
            formDataToSend, // 서버로 전송할 FormData
            {
                headers: {
                    "Content-Type": "multipart/form-data", // 데이터를 multipart/form-data로 전송
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("업로드 성공:", res.data);
        uploadDes();
        nextStep();  // 서버 전송 후 다음 단계로 진행
    } catch (error) {
        console.error("업로드 실패:", error);
        alert("An error occurred during the upload.");
    }
};

// CKEditor에서 받아올 내용
const handleContentChange = (content) => {
    setDescriptionDTO(content);
};

const showId = 1;

// 서버에 상세내용 보내기 
const uploadDes = async () => {
    const token = sessionStorage.getItem("accessToken");

    // FormData에 데이터 추가
    const formData = new FormData();
    formData.append('descriptionDTO', descriptionDTO);

    try {
        const response = await axios.post(
            `https://showhoo.site/${showId}/show-register/description`,  // 실제 서버 API 엔드포인트
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log("서버 응답:", response.data);
    } catch (error) {
        console.error("업로드 실패:", error);
    }
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
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
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
          />
          <input
            className="inf_concertName"
            type="text"
            placeholder="공연명"
            onChange={handleChange}
            name="name"
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
          <Editor onContentChange={handleContentChange} setImgData={setImgData}/>
        </div>
      </div>
      <div className="Poster_button">
        <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
        <Button text={"다음 단계"} type={"green"} onClick={uploadInf} />
      </div>
    </div>
  );
};

export default ReadyPoster;
