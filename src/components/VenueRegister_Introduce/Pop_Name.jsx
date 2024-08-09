// Pop_Name.jsx
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Name.css';

const Pop_Name = ({ isOpen, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState(''); // 입력된 값을 상태로 관리

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(inputValue); // 부모 컴포넌트로 값 전달
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>공연장 이름</h2>
        <p className="p">개성적인 공연장 이름을 지어주세요!</p>
        <input 
          type="text" 
          placeholder="공연장 이름" 
          className="modal-input" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} // 입력값 업데이트
        />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="confirm-button" onClick={handleConfirm}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Pop_Name;

