//Pop_Place.jsx
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Place.css';

const Pop_Place = ({ isOpen, onClose, onConfirm }) => {
  const [city, setCity] = useState('');
  const [subCity, setSubCity] = useState('');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [building, setBuilding] = useState('');
  const [postalCode, setPostalCode] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const fullAddress = `${city} ${subCity} ${district} ${streetAddress} ${building} ${postalCode}`;
    onConfirm(fullAddress);
  };

  return (
    <div className="modal-overlay2">
      <div className="modal-container2">
        <h2>공연장 위치</h2>
        <p className="p">정확한 주소를 입력해주세요</p>
        
        <div className="address-fields">
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control modal-input2 rounded-top" 
              id="floatingInput1" 
              placeholder="도/특별 광역시" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              style={{ borderRadius: '18px 18px 0px 0px' }} 
            />
            <label htmlFor="floatingInput1">도/특별 광역시</label>
          </div>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control modal-input2" 
              id="floatingInput2" 
              placeholder="도시(해당하는 경우)" 
              value={subCity} 
              onChange={(e) => setSubCity(e.target.value)} 
              style={{ borderRadius: '0px 0px 0px 0px' }}
            />
            <label htmlFor="floatingInput2">도시(해당하는 경우)</label>
          </div>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control modal-input2" 
              id="floatingInput3" 
              placeholder="군/구(해당하는 경우)" 
              value={district} 
              onChange={(e) => setDistrict(e.target.value)}
              style={{ borderRadius: '0px 0px 0px 0px' }}
            />
            <label htmlFor="floatingInput3">군/구(해당하는 경우)</label>
          </div>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control modal-input2" 
              id="floatingInput4" 
              placeholder="도로명 주소" 
              value={streetAddress} 
              onChange={(e) => setStreetAddress(e.target.value)} 
              style={{ borderRadius: '0px 0px 0px 0px' }}
            />
            <label htmlFor="floatingInput4">도로명 주소</label>
          </div>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control modal-input2" 
              id="floatingInput5" 
              placeholder="건물명, 층수/호수(해당하는 경우)" 
              value={building} 
              onChange={(e) => setBuilding(e.target.value)} 
              style={{ borderRadius: '0px 0px 0px 0px' }}
            />
            <label htmlFor="floatingInput5">건물명, 층수/호수(해당하는 경우)</label>
          </div>
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control modal-input2 rounded-bottom" 
              id="floatingInput6" 
              placeholder="우편번호" 
              value={postalCode} 
              onChange={(e) => setPostalCode(e.target.value)} 
              style={{ borderRadius: '0px 0px 18px 18px' }}
            />
            <label htmlFor="floatingInput6">우편번호</label>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="confirm-button" onClick={handleConfirm}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Pop_Place;
