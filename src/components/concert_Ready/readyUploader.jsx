import "../../styles/Eojin/readyUploader.css";
import Button from "../common/Button";
import React, { useState } from 'react';

const ReadyUploader = ({ onClose, uploadSuc, uploadFail, setForm }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('선택된 파일 없음');

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
            setForm(selectedFile);

            console.log('File read successfully');
            uploadSuc();
            onClose();
        };
        reader.onerror = (e) => {
            console.error('Error reading file', e);
            alert('파일을 읽는 중에 오류가 발생했습니다.');
        };
        reader.readAsDataURL(selectedFile);
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