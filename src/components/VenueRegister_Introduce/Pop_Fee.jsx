//Pop_Fee.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Pop_Fee.css';

const Pop_Fee = ({ isOpen, onClose, onConfirm, initialDescription, initialOffSeasonFees, initialPeakSeasonFees, initialAccountInfo }) => {
  const [description, setDescription] = useState(initialDescription || '');
  const [fees, setFees] = useState({ offSeason: '', peakSeason: '' });
  const [accountInfo, setAccountInfo] = useState(initialAccountInfo || { bank: '', holder: '', accountNumber: '' });
  const [selectedOffDays, setSelectedOffDays] = useState([]);
  const [selectedPeakDays, setSelectedPeakDays] = useState([]);
  const [offSeasonSaved, setOffSeasonSaved] = useState(initialOffSeasonFees || {});
  const [peakSeasonSaved, setPeakSeasonSaved] = useState(initialPeakSeasonFees || {});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'

  useEffect(() => {
    const allOffDaysFilled = ['월', '화', '수', '목', '금', '토', '일'].every(day => offSeasonSaved[day]);
    const allPeakDaysFilled = ['월', '화', '수', '목', '금', '토', '일'].every(day => peakSeasonSaved[day]);
    const isAccountInfoFilled = accountInfo.bank && accountInfo.holder && accountInfo.accountNumber; // 은행 정보 모두 입력 확인

    if (allOffDaysFilled && allPeakDaysFilled && isAccountInfoFilled) {
      setIsButtonDisabled(false); // 모든 조건이 만족하면 버튼 활성화
    } else {
      setIsButtonDisabled(true); // 조건이 만족하지 않으면 버튼 비활성화
    }
  }, [offSeasonSaved, peakSeasonSaved, accountInfo]); // 의존성 배열에 accountInfo 추가

  useEffect(() => {
    if (message !== '') {
      const messageElement = document.querySelector('.save-message');
      if (messageElement) {
        messageElement.classList.add('show');
      }
      const timer = setTimeout(() => {
        setMessage('');
        if (messageElement) {
          messageElement.classList.remove('show');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDayClick = (season, day) => {
    if (season === 'offSeason') {
      setSelectedOffDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
    } else {
      setSelectedPeakDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
    }
  };

  const handleSave = season => {
    if (season === 'offSeason') {
      if (selectedOffDays.some(day => offSeasonSaved[day])) {
        setMessageType('off-season');
        setMessage('다른 요일이랑 중복 설정된 가격입니다!');
      } else {
        const newSaved = { ...offSeasonSaved };
        selectedOffDays.forEach(day => {
          newSaved[day] = fees.offSeason;
        });
        setOffSeasonSaved(newSaved);
        setSelectedOffDays([]);
        setMessageType('off-season');
        setMessage('저장되었습니다.');
      }
    } else {
      if (selectedPeakDays.some(day => peakSeasonSaved[day])) {
        setMessageType('peak-season');
        setMessage('다른 요일이랑 중복 설정된 가격입니다!');
      } else {
        const newSaved = { ...peakSeasonSaved };
        selectedPeakDays.forEach(day => {
          newSaved[day] = fees.peakSeason;
        });
        setPeakSeasonSaved(newSaved);
        setSelectedPeakDays([]);
        setMessageType('peak-season');
        setMessage('저장되었습니다.');
      }
    }
  };

  const handleConfirm = () => {
    const offSeasonFees = { ...offSeasonSaved };
    const peakSeasonFees = { ...peakSeasonSaved };
    const accountDetails = {
      bank: accountInfo.bank,
      holder: accountInfo.holder,
      accountNumber: accountInfo.accountNumber,
    };

    // // 콘솔에 비성수기/성수기 대관료 및 계좌 정보 출력
    // console.log("비성수기 요일별 대관료:", offSeasonFees);
    // console.log("성수기 요일별 대관료:", peakSeasonFees);
    // console.log("은행명:", accountDetails.bank);
    // console.log("예금주:", accountDetails.holder);
    // console.log("계좌번호:", accountDetails.accountNumber);

    onConfirm(description, offSeasonFees, peakSeasonFees, accountDetails);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
        setDescription(initialDescription);
        setOffSeasonSaved(initialOffSeasonFees || {});
        setPeakSeasonSaved(initialPeakSeasonFees || {});
        setAccountInfo(initialAccountInfo || { bank: '', holder: '', accountNumber: '' });
    }
}, [isOpen]);

  // 모달이 열려있지 않을 때는 컴포넌트를 렌더링하지 않도록 수정
  if (!isOpen) return null;


  return (
    <div className="modal-overlay-fee">
      <div className="modal-container-fee">
        <h2 className="h2-fee">대관료 작성</h2>
        <p className="p-fee">
          <strong style={{ color: 'black' }}>공연자에게 보여질 대관료</strong>입니다. 공연자가 한눈에 알아볼 수 있도록 간단하게 줄글로 작성해주세요.
        </p>
        <textarea 
          className="description-field-fee" 
          placeholder="Enter치면 리스트 만들기 가능"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>

        <h2 className="h2-fee">대관료 설정</h2>
        <p className="p-fee">
          공연자가 날짜를 선택하면 <strong style={{ color: 'black' }}>자동으로 적용될 대관료</strong>입니다. 성수기와 비성수기 때의 가격을 설정해주시면 됩니다.
        </p>

        <div className="fee-setting">
          <h3 style={{ fontSize: '25px' }}>비성수기</h3>
          <p className="sub-description">모든 요일의 가격을 <span style={{ color: '#F01569' }}>반드시 설정</span>해야 합니다.</p>
          <div className="days-container">
            {['월', '화', '수', '목', '금', '토', '일'].map((day, index, array) => (
              <button
                key={day}
                className={`day-button ${selectedOffDays.includes(day) ? 'selected' : ''}`}
                onClick={() => handleDayClick('offSeason', day)}
                style={{
                  borderRadius:
                    index === 0
                      ? '18px 0px 0px 18px' 
                      : index === array.length - 1
                      ? '0px 18px 18px 0px' 
                      : '0px', 
                }}
              >
                {day}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="fee-input"
            placeholder="숫자만 입력해 주세요 !"
            value={fees.offSeason|| ''}
            onChange={e => setFees({ ...fees, offSeason: e.target.value })}
          />
          <span className="currency-unit">원</span>
          <button className="fee-save-button" onClick={() => handleSave('offSeason')}>저장</button>
        </div>

        <div className="fee-setting">
          <h3 style={{ fontSize: '25px' }}>성수기(8월,11월,12월)</h3>
          <p className="sub-description">모든 요일의 가격을 <span style={{ color: '#F01569' }}>반드시 설정</span>해야 합니다.</p>
          <div className="days-container">
            {['월', '화', '수', '목', '금', '토', '일'].map((day, index, array) => (
              <button
                key={day}
                className={`day-button ${selectedPeakDays.includes(day) ? 'selected' : ''}`}
                onClick={() => handleDayClick('peakSeason', day)}
                style={{
                  borderRadius:
                    index === 0
                      ? '18px 0px 0px 18px' 
                      : index === array.length - 1
                      ? '0px 18px 18px 0px' 
                      : '0px', 
                }}
              >
                {day}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="fee-input"
            placeholder="숫자만 입력해 주세요 !"
            value={fees.peakSeason || ''}
            onChange={e => setFees({ ...fees, peakSeason: e.target.value })}
          />
          <span className="currency-unit">원</span>
          <button className="fee-save-button" onClick={() => handleSave('peakSeason')}>저장</button>
        </div>

        <p className={`save-message ${messageType}`}>{message}</p>

        <h2 className="h2-fee">계좌번호 입력</h2>
        <p className="p-fee">예약금을 입금받을 계좌 정보를 입력해주세요.</p>
        <div className="account-info">
          <div className="account-info-row">
            <input 
              type="text" 
              placeholder="은행명" 
              value={accountInfo.bank || ''} 
              onChange={e => setAccountInfo({ ...accountInfo, bank: e.target.value })} 
            />
            <input 
              className='account-info-row-input2'
              type="text" 
              placeholder="예금주" 
              value={accountInfo.holder || ''} 
              onChange={e => setAccountInfo({ ...accountInfo, holder: e.target.value })} 
            />
          </div>
          <div className="account-info-row">
            <input 
              className='account-info-row-input3'
              type="text" 
              placeholder="계좌번호" 
              value={accountInfo.accountNumber || ''} 
              onChange={e => setAccountInfo({ ...accountInfo, accountNumber: e.target.value })} 
            />
          </div>
        </div>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="confirm-button" onClick={handleConfirm} disabled={isButtonDisabled}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Pop_Fee;

