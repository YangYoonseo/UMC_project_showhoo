import "../../styles/Eojin/readyUploader.css";
import Button from "../common/Button";
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import axios from 'axios';

const ReadyUploader = ({ onClose, uploadSuc, uploadFail, form, setShowId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('선택된 파일 없음');
    const [data, setData] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '선택된 파일 없음');
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            console.log('No file selected, calling uploadNonComplete and onClose');
            uploadFail();
            onClose();
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            // 파일이 성공적으로 로드되었을 때 처리
            const fileContent = e.target.result.split(',')[1]; // Base64 인코딩된 문자열만 가져옴
            setData(fileContent);

            console.log('File read successfully:', e.target.result);
            uploadData();
            uploadSuc();
            onClose();
        };
        reader.onerror = (e) => {
            console.error('Error reading file', e);
            alert('파일을 읽는 중에 오류가 발생했습니다.');
        };
        reader.readAsDataURL(selectedFile);
    };
    

    const uploadData = async () => {
        const token = sessionStorage.getItem("accessToken");

        try {
            const formData = new FormData();
            formData.append(form, data);  // 'file'은 서버에서 받을 파일의 key입니다.
            console.log("전달할 데이터:", formData);
    
            const res = await axios.post(
                `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/space/${spaceApplyId}/prepare`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("업로드 성공:", res.data);
            setShowId(res.data.result.showId);
            setData('');
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    };

  return (
    <div className="backdrop">
      <div className="Uploader">
        <h1>업로드하기</h1>
        <div className="content">
            <h4>해당 파일을 업로드해주세요</h4>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
            />
            <div className="fileContainer">
                <div className="fileName">{fileName}</div>
                <label htmlFor="fileInput" >
                    파일 선택
                </label>
            </div>
            <p>반드시 <span className="highlight">공연장이 제시한 양식 파일</span>로 업로드해주세요.</p>
        </div>
        <div className="Uploader_button">
            <Button text={"확인"} type={"oneBtn_green"} onClick={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default ReadyUploader;