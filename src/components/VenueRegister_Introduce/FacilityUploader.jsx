import "../../styles/Eojin/readyUploader.css";
import Button from "../common/Button";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacilityUploader = ({ onClose, uploadSuc, uploadFail }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('선택된 파일 없음');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '선택된 파일 없음');
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            console.log('No file selected, calling uploadNonComplete and onClose');
            uploadFail();
            onClose();
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const apiUrl = 'http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081';
        const showId = 1;
        const endpoint = '/space/' + showId + '/show-prepare';

        // 인증 토큰 가져오기 
        const token = localStorage.getItem('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjMyMDg3MDEzIiwiZXhwIjoxNzIyOTMwODI1fQ.a06BQyKx1BR1gh8uSJJ9VhoUnpUAAfHTQKQdJD3H0r7pNQwZh3zmz5DW8v-Sj5WV-4cQz2UJ8lU7i7igJVWgIg');

        try {
            const response = await axios.post(apiUrl+endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // 인증 토큰 포함
                }
            });
            console.log('File upload response:', response.data);
            if (response.status === 200) {
                uploadSuc();
            } else {
                uploadFail();
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            uploadFail();
        } finally {
            onClose();
        }

        onClose();
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
            <p>반드시 <span className="highlight">용량 10MB 미만의 엑셀 파일</span>로 업로드해주세요.</p>
        </div>
        <div className="Uploader_button">
            <Button text={"확인"} type={"oneBtn_green"} onClick={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default FacilityUploader;