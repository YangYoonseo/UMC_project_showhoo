//Pop_Service.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Service.css';
import add_service_btn from '../../assets/images/venueregisterpage_introduce/add_service_btn.svg';

const Pop_Service = ({ isOpen, onClose, onConfirm, initialDescription, initialOptions }) => {
  const [services, setServices] = useState(initialOptions || []);
  const [description, setDescription] = useState(initialDescription || '');



  // 서비스 추가
  const addService = () => {
    setServices([...services, { name: '', price: '' }]);
  };

  // 서비스 변경
  const handleServiceChange = (index, event) => {
    const updatedServices = [...services];
    updatedServices[index][event.target.name] = event.target.value;
    setServices(updatedServices);
  };

  // 공백인 것만 콘솔에 출력!!!
  const handleConfirm = () => {
    const filteredServices = services.filter(service => service.name.trim() !== '' || service.price.trim() !== '');
    console.log("추가 서비스 옵션:", filteredServices);
    onConfirm(description, filteredServices); // 텍스트 필드와 옵션 필드(공백은 걸러진!)
  };

  useEffect(() => {
    if (!isOpen) return;
    setDescription(initialDescription);
    setServices(initialOptions || [{ name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }]);
  }, [isOpen]);

  // 모달이 열려있지 않을 때는 컴포넌트를 렌더링하지 않도록 수정
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
                  type="number" 
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
