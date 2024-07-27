import React from 'react';
import './VenueDetails.css';

const QnA = () => {
  const questions = [
    {
      id: 1,
      profileImage: 'profile1.png', // 프로필 이미지 파일 경로
      profileName: '홍부',
      question: '안녕하세요, 혹시 MR 요청도 가능할까요?',
      timestamp: '2024.06.26 23:43:45',
      answer: '네 가능합니다 :)',
      answerTimestamp: '2024.06.26 23:45:35',
    },
    // 추가적인 질문들을 이 배열에 추가할 수 있습니다.
  ];

  return (
    <div className="venue-qna">
      <div className="qna-header">
        <div className="qna-title">
          <h2>Q&A</h2>
          <span>{questions.length}개</span>
        </div>
        <button className="qna-button">질문 작성하기</button>
      </div>
      {questions.map((q) => (
        <div key={q.id} className="question-item">
          <img src={q.profileImage} alt="Profile" className="profile-image" />
          <div className="question-content">
            <span className="profile-name">{q.profileName}</span>
            <p>{q.question}</p>
            <span className="timestamp">{q.timestamp}</span>
            {q.answer && (
              <div className="answer-content">
                <span className="answer">공연장의 답글</span>
                <p>{q.answer}</p>
                <span className="answer-timestamp">{q.answerTimestamp}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QnA;
