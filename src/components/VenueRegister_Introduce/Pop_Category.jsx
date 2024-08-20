//Pop_Category.jsx
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Category.css';

const Pop_Category = ({ isOpen, onClose, onConfirm }) => {
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 유형 상태 관리

  if (!isOpen) return null;

  const categories = ['콘서트홀', '아트홀', '대공연장', '소공연장', '대극장', '소극장'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 유형 업데이트
  };

  const handleConfirm = () => {
    if (selectedCategory) {
      onConfirm(selectedCategory); // 부모 컴포넌트로 선택된 유형 전달
      onClose(); // 팝업 닫기
    }
  };

  return (
    <div className="modal-overlay-category23">
      <div className="modal-container-category23">
        <h2>공연장 유형</h2>
        <p className="p-category23">본인의 공연장에 맞는 유형을 선택해주세요.</p>
        <div className="category-grid23">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="modal-buttons-category33">
          <button className="cancel-button333" onClick={onClose}>뒤로 가기</button>
          <button 
            className="confirm-button333" 
            onClick={handleConfirm} 
            disabled={!selectedCategory} // 선택된 유형이 없으면 버튼 비활성화
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pop_Category;
