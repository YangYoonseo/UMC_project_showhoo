import "../../styles/Eojin/HostAnswer.css";
import { useState, useEffect } from "react";

const HostAnswer = ({ spaceId, index }) => {
    const [answer, setAnswer] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);


    // 리뷰 답변 보내기 API 연결 
    async function uploadAnswer(index) {
        const data = {
            answer: answer
        };
        
        const token = sessionStorage.getItem("accessToken");
        try {
            const res = await axios.post(
                `https://showhoo.site/space/${spaceId}/review/${index}/reviewAnswer`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },           
                }
            );
            console.log("업로드 성공:", res.data);
            setAnswer("");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        console.log("Updated Data:", answer);
    }, [answer, index]); // `answer`와 `index`가 변경될 때마다 실행

    const onClick = () => {
        setAnswer(inputValue);  // input에 입력된 값을 answer로 설정
        setDate(new Date());
        setIsOpen(true);
        setInputValue(""); // 입력 후 input 필드를 비웁니다.
        uploadAnswer(index);
    };

    const onChange = (e) => {
        setInputValue(e.target.value); // input의 변화를 state로 관리
    };

    return (
        <div className="HostAnswer">
            {!isOpen && (
                <div className="answer_input">
                    <textarea
                        placeholder="후기에 대한 답글을 달아주세요"
                        value={inputValue}  // inputValue state로 값 설정
                        onChange={onChange}  // 입력 값이 바뀔 때마다 onChange 함수 호출
                        rows={1} // 텍스트 영역의 기본 크기 설정
                    />
                    <button onClick={onClick}>등록</button>
                </div>
            )}
            {isOpen && 
                <div className="Myanswer">
                    <h4>내 답변</h4>
                    <p className="answer" style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
                    <p className="answer_date">{date.toLocaleString()}</p>
                </div>
            }
        </div>
    );
};

export default HostAnswer;


