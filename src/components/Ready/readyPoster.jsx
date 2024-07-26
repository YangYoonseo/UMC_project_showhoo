import "../../styles/readyPoster.css";
import React, { useState } from "react";
import Button from "../common/Button";

const ReadyPoster = ({ preStep, nextStep }) => {
    const [formData, setFormData] = useState({
        club: '',
        concertName: '',
        date: '',
        time: '',
        runningTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    return (
        <div className="ReadyPoster">
            <div className="Poster_container">
                <div className="Poster_img">
                    <h4>공연 포스터</h4>
                    <p>포스터 이미지는 표준 종이 규격 (A,B)에 최적화되어 있습니다.</p>
                    <p>사진 형식은 JPG,JPEG, PNG만 가능합니다.</p>
                    <div className="Poster"></div>
                </div>
                <div className="Poster_inf">
                    <h4>공연 정보</h4>
                    <p>공연 정보는 등록 이후에 수정할 수 없어요.</p>
                    <input
                        className="inf_club" 
                        type="text" 
                        value={formData.club} 
                        placeholder="001 클럽"
                        onChange={handleChange} 
                    />
                    <input 
                        className="inf_concertName"
                        type="text" 
                        value={formData.concertName} 
                        placeholder="공연명" 
                        onChange={handleChange} 
                    />
                    <div className="inf_table">
                        <input 
                            className="inf_date"
                            type="text" 
                            value={formData.date} 
                            placeholder="날짜" 
                            onChange={handleChange} 
                        />
                        <input 
                            className="inf_time"
                            type="text" 
                            value={formData.time} 
                            placeholder="시간" 
                            onChange={handleChange} 
                        />
                    </div>
                    <input 
                        className="inf_runningTime"
                        type="text" 
                        value={formData.runningTime} 
                        placeholder="러닝 타임" 
                        onChange={handleChange} 
                    />                   
                </div>
            </div>
            <div className="Poster_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"다음 단계"} type={"green"} onClick={nextStep} />
            </div>
        </div>
    )
};

export default ReadyPoster;