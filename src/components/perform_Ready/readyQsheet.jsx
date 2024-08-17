import "../../styles/Eojin/readyQsheet.css";
import { useState,useEffect } from "react";
import Button from "../common/Button";
import ReadySubmit from "./readySubmit";
import ReadyDownload from "./readyDownload";
import setList from "../../assets/img_Ready/setList.svg";
import rentalTime from "../../assets/img_Ready/rentalTime.svg";
import plus from "../../assets/img_Ready/plus.svg";
import axios from 'axios';

const ReadyQsheet = ({ nextStep, check }) => {
    const [ qsheet, setQsheet ] = useState ([
        {
            setList: false,
            rentalTime: false,
            plus: false,
        }
    ]);

    const [urls, setUrls] = useState({
        setListForm: '',
        rentalTimeForm: '',
        addOrderForm: ''
    });

    const showID = 1;

    useEffect(() => {
        async function fetchData() {
            const token = sessionStorage.getItem('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjY3NzgzMDA0IiwiZXhwIjoxNzIzODcyNTgzfQ.v3mQ7RwmbA5BWIT6wYQrxe1XD4SiaWTlI86OpNjWGV78qZRz_gs27x6m3OCLu6RI0LmpW13UcmwJxl_y2IAeuw');
            const instance = axios.create({
                baseURL: 'http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081',
                headers: { Authorization: `Bearer ${token}` }
            });

            instance.interceptors.response.use(
                response => response.data,
                async function(error) {
                    if(error.response?.status === 401) {
                        alert('로그인 필요')
                        //redirectToLogin();
                    }
                    else{
                        throw error;
                    }
                }
            );

            try {
                const res = await instance.get(`/performer/${showID}/prepare`, {
                    withCredentials: true,
                });
        
                // 응답 데이터가 성공인지 확인한 후, result를 추출합니다.
                if (res.isSuccess) {
                    const { setListForm, rentalTimeForm, addOrderForm } = res.result;
                    setUrls({ setListForm, rentalTimeForm, addOrderForm });
                } else {
                    console.error('API 응답이 성공적이지 않습니다:', res.message);
                }
            } 
            catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const onCheck = (id) => {
        setQsheet(prevState => {
            // 이전 상태의 복사본을 만듭니다.
            const updatedQsheet = [...prevState];
            // 배열의 첫 번째 객체를 업데이트합니다.
            updatedQsheet[0] = {
                ...updatedQsheet[0],
                [id]: true
            };
            // 업데이트된 배열을 반환합니다.
            return updatedQsheet;
        });
    };

    const allValuesTrue = () => {
        // qsheet 배열의 첫 번째 객체를 가져옵니다.
        const sheet = qsheet[0];
    
        // 객체의 모든 값이 true인지 확인합니다.
        return Object.values(sheet).every(value => value === true);
    };

    const checkQsheet = () => {
        console.log(qsheet);
        if (allValuesTrue()) {
            check("Qsheet");
            nextStep();
        } else {
            console.log("이전 단계를 채워주세요.");
        }
    };

    return (
        <div className="ReadyQsheet">
            <div className="Qsheet_download">
                <h4>다운로드</h4>
                <p>대관을 위해 제출해야 할 신청서 및 양식을 다운로드하실 수 있습니다.</p>
                <div className="download_container">
                    <ReadyDownload text={"공연 셋리스트 양식"} id={"setList"} img={setList} url={urls.setListForm} />
                    <ReadyDownload text={"대관 시간 양식"} id={"rentalTime"} img={rentalTime} url={urls.rentalTimeForm} />
                    <ReadyDownload text={"추가 주문 양식"} id={"plus"} img={plus} url={urls.addOrderForm} />
                </div>
            </div>
            <div className="Qsheet_submit">
                <h4>제출하기</h4>
                <div className="submit_container">
                    <ReadySubmit text={"공연 셋리스트"} id={"setList"} onCheck={onCheck}/>
                    <ReadySubmit text={"대관 시간"} id={"rentalTime"} onCheck={onCheck} />
                    <ReadySubmit text={"추가 주문 사항"} id={"plus"} onCheck={onCheck} />
                </div>
            </div>
            <div className="Qsheet_button">
                <Button text={"다음 단계"} type={"green"} onClick={checkQsheet}/>
            </div>
        </div>
    )
};

export default ReadyQsheet;