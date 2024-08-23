import "../../styles/Eojin/readyPoster.css";
import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // 날짜 포맷팅을 위해 가져오기
import axios from "axios";

import Button from "../common/Button";
import Editor from "./Editor/Editor";
import SelectCalender from "./Datepicker/calender";

import arrow from "../../assets/img_Ready/arrow.svg";

const ReadyPoster = ({ preStep, nextStep, check, showId }) => {
  const [image, setImage] = useState(null);     // 포스터 이미지 파일
  const [imageUrl, setImageUrl] = useState(null);   // 포스터 이미지 URL
  const [selectedDate1, setSelectedDate1] = useState(null);   // 공연 날짜 입력값
  const [selectedDate2, setSelectedDate2] = useState(null);   //예매취소기한 입력값 
  const [isDatePickerOpen1, setIsDatePickerOpen1] = useState(false);    // 공연 날짜 팝업창
  const [isDatePickerOpen2, setIsDatePickerOpen2] = useState(false);    // 예매 기한 취소 날짜 팝업창 
  const [name, setName] = useState("");   // 공연명 
  const [date, setDate] = useState("");   // 공연 날짜
  const [time, setTime] = useState("");   // 공연 시간
  const [concertDate, setConcertDate] = useState("");
  const [runningTime, setRunningTime] = useState("");   // 러닝 타임
  const [cancelDate, setCancelDate] = useState("");   // 예매취소기한 날짜
  const [cancelTime, setCancelTime] = useState("");   // 예매취소기한 시간
  const [cancelDateTime, setCancelDateTime] = useState("");

  // CKEditor에서 받아올 데이터 
  const [text, setText] = useState('');   // 상세내용 text 
  const [imgData, setImgData] = useState(null);  // 상세내용 image 

  //기기에서 업로드 링크 
  const handleUploadClick = () => {
    document.getElementById("file-input").click();
  };

  // 포스터 파일 받아오기 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setImage(file);
    } else {
        alert("Only JPG, JPEG, and PNG files are allowed.");
    }
  };

  // Poster Url 받아오는 함수 
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

  useEffect(() => {
    if(image) {
      getPosterUrl();
    } else {
      alert("파일이 비어있어요!");
    }
  },[image]);

 // 날짜 변환 함수 
  const formatDate = (data) => {
    // 날짜를 'YYYY-MM-DD' 형식으로 변환
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(data.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  // 시간 변환 함수 
  const formatTime = (data) => {
    // 시간 'HH-MM' 형식으로 변환
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  const formatDateTime = (data) => {
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(data.getDate()).padStart(2, '0');
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // 공연 날짜 정하는 함수 
  const handleDateChange1 = (data) => {
    setSelectedDate1(data);
    setDate(formatDate(data));
    setTime(formatTime(data));
    setConcertDate(formatDateTime(data));
    setIsDatePickerOpen1(false); // 선택 후 DatePicker 닫기
    console.log(date, time);
  };

  // 예매 취소 기한 정하는 함수 
  const handleDateChange2 = (data) => {
    setSelectedDate2(data);
    setCancelDate(formatDate(data));
    setCancelTime(formatTime(data));
    setCancelDateTime(formatDateTime(data));
    setIsDatePickerOpen2(false); // 선택 후 DatePicker 닫기
    console.log(cancelDate, cancelTime);
  };

  // 공연 날짜 정하는 팝업창 열기 
  const toggleDatePicker1 = () => {
    setIsDatePickerOpen1(!isDatePickerOpen1);
  };

  // 예매 취소 기한 정하는 팝업창 열기 
  const toggleDatePicker2 = () => {
    setIsDatePickerOpen2(!isDatePickerOpen2);
  };


  // 공연 포스터 및 정보에 대한 데이터 API 연결
  const performerProfileId = 11;

  const uploadInf = async () => {
    const token = sessionStorage.getItem("accessToken");

    const getName = name;
    const getUrl = imageUrl;
    const getDate = date;
    const getTime = time;
    const getRunningTime = runningTime;
    const getCancelDate = cancelDate;
    const getCancelTime = cancelTime;

    const formData = {
      "name": getName,
      "posterUrl": getUrl,
      "date": getDate,
      "time": getTime,
      "runningTime": getRunningTime,
      "cancelDate": getCancelDate,
      "cancelTime": getCancelTime
    }

    try {
        const res = await axios.post(
            `https://showhoo.site/${performerProfileId}/show-register`,
            formData, // 서버로 전송할 FormData
            {
                headers: {
                    "Content-Type": "application/json", // 데이터를 multipart/form-data로 전송
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
      setText(content);
  };

  // 서버에 상세내용 보내기 API 연결 
  const uploadDes = async () => {
    const token = sessionStorage.getItem("accessToken");

    // FormData에 데이터 추가
    const formData = new FormData();
    const descriptionDTO = {
      "showId": showId,
      "text": text
    }

    const img = imgData;
    formData.append("descriptionDTO", JSON.stringify(descriptionDTO));
    formData.append("img", img);

    console.log("서버로 전송할 데이터:", formData);

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
                <p>포스터를 추가하세요.</p>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="inf_date" onClick={toggleDatePicker1}>
            {selectedDate1 ? <p>{concertDate}</p> : <p>공연 날짜</p>}
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
            value={runningTime}
            onChange={(e) => setRunningTime(e.target.value)}
          />
          <div className="inf_cancel" onClick={toggleDatePicker2}>
            {selectedDate2 ? <p>{cancelDateTime}</p> : <p>예매 취소 기한</p>}
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
