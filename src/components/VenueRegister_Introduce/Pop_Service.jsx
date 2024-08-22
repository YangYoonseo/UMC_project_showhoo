//Pop_Service.jsx
//Pop_Service.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Service.css';
import add_service_btn from '../../assets/images/venueregisterpage_introduce/add_service_btn.svg';

const Pop_Service = ({ isOpen, onClose, onConfirm, initialDescription, initialOptions }) => {
  const [services, setServices] = useState(initialOptions || []);
  const [description, setDescription] = useState(initialDescription || '');

  useEffect(() => {
    if (isOpen && services.length === 0) {
      // 팝업이 열리고, 서비스가 비어 있을 때만 초기화
      setDescription(initialDescription || '');
      setServices(initialOptions?.length > 0 ? initialOptions : [{ name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }]);
    }
  }, [isOpen, initialDescription, initialOptions]);
  
  // 서비스 추가 함수
  const addService = () => {
    setServices([...services, { name: '', price: '' }]);
  };

  // 가격에 숫자만 입력 가능하도록 설정하는 함수
  const handlePriceChange = (index, value) => {
    if (/^\d*$/.test(value)) { // 입력된 값이 숫자인 경우만 허용
      const updatedServices = [...services];
      updatedServices[index].price = value;
      setServices(updatedServices);
    } else {
      alert('가격은 숫자만 입력 가능합니다.');
    }
  };

  // 서비스 변경 함수
  const handleServiceChange = (index, event) => {
    const updatedServices = [...services];
    const { name, value } = event.target;

    if (name === "name" && value.length > 7) {
      alert("서비스 이름은 최대 7자까지 입력 가능합니다.");
      return;
    }

    if (name === "price") {
      handlePriceChange(index, value);
    } else {
      updatedServices[index][name] = value;
      setServices(updatedServices);
    }
  };

  // 공백 서비스 필터링 후 확인 함수
  const handleConfirm = () => {
    const filteredServices = services.map(service => {
      // title이 있는데 price가 비어있는 경우 price를 0으로 설정
      if (service.name.trim() !== '' && service.price.trim() === '') {
        return { ...service, price: '0' };
      }
      return service;
    }).filter(service => service.name.trim() !== '' || service.price.trim() !== '');

    onConfirm(description, filteredServices);
    onClose(); // 팝업 닫기
    console.log(filteredServices);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay4">
      <div className="modal-container4">
        <h2 className='h2-4'>추가 서비스 등록</h2>
        <p className='p-4'>
          <strong style={{ color: 'black' }}>공연자에게 보여질 추가 서비스에 대한 설명</strong>입니다. 공연자가 한눈에 알아볼 수 있도록 간단하게 줄글로 작성해주세요.
        </p>

        <textarea 
          className="description-field4" 
          placeholder="Enter치면 리스트 만들기 가능"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <p className='p-40'>
          아래는 공연자가 선택할 수 있는 <strong style={{ color: 'black' }}>추가 서비스 옵션</strong>입니다. 간단하게 서비스명을 작성해주시고 가격을 설정해주세요.
        </p>

        <div className='description-placehold'>
          <div>
            <p className='p-41'>서비스명</p>
            <p className='p-42'>공백 포함 7자 이하로 적어주세요</p>
          </div>
          <div>
            <p className='p-41'>금액</p>
            <p className='p-42'>서비스의 판매금액을 적어주세요</p>
          </div>
        </div>

        <div className="service-options">
          {services.map((service, index) => (
            <div key={index} className="service-option">
              <input 
                type="text" 
                name="name" 
                placeholder="추가 서비스" 
                value={service.name} 
                onChange={(e) => handleServiceChange(index, e)} 
                className="service-input"
              />
              <div className="price-container">
                <input 
                  type="text" 
                  name="price" 
                  placeholder="0" 
                  value={service.price} 
                  onChange={(e) => handleServiceChange(index, e)} 
                  className="price-input"
                />
                <span>원</span>
              </div>
            </div>
          ))}
        </div>

        <div className="add-service" >
          <img className="add-service-btn" src={add_service_btn} onClick={addService}/>
        </div>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="confirm-button" onClick={handleConfirm}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Pop_Service;