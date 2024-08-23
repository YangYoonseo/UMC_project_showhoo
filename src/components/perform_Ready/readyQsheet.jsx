import "../../styles/Eojin/readyQsheet.css";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

import Button from "../common/Button";
import ReadySubmit from "./readySubmit";
import ReadyDownload from "./readyDownload";

import setListImg from "../../assets/img_Ready/setList.svg";
import rentalTimeImg from "../../assets/img_Ready/rentalTime.svg";
import plus from "../../assets/img_Ready/plus.svg";

const ReadyQsheet = ({ nextStep, check, spaceApplyId, setShowId, showId }) => {
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

    const [ setList, setSetList ] = useState('');
    const [ rentalTime, setRentalTime ] = useState('');
    const [ addOrder, setAddOrder ] = useState('');

    const showId = 8;

    // 다운로드 양식 받기 
    async function getDownloadData() {
        const token = sessionStorage.getItem("accessToken");
        if(showId) {
            try {
                const res = await axios.get(
                    `https://showhoo.site/performer/${showId}/prepare`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },           
                    }
                );
                const { setListForm, rentalTimeForm, addOrderForm } = res.data.result;
                setUrls({ setListForm, rentalTimeForm, addOrderForm });
                console.log("다운로드 양식 보기", res.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
    };

    useEffect(() => {
        getDownloadData();
    }, []);

    // 큐시트 업로드 하기 
    async function getUploadData() {
        if (setList && addOrder && rentalTime) {
            const token = sessionStorage.getItem("accessToken");

            const getSetList = setList;
            const getAddOrder = addOrder;
            const getRentalTime = rentalTime;

            const formData = new FormData();
            formData.append("setList", JSON.stringify(getSetList));
            formData.append("addOrder", JSON.stringify(getAddOrder));
            formData.append("rentalTime", JSON.stringify(getRentalTime));

            console.log("서버로 전송할 데이터:", formData);

            try {
                const res = await axios.post(
                    `https://showhoo.site/performer/${spaceApplyId}/prepare`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },           
                    }
                );

                console.log("등록 결과:", res.data);
                setShowId(res.data.result.showId);
                console.log("showId:", showId);
                alert("큐시트 폼 등록이 성공적으로 완료되었습니다.");
            } catch (error) {
                console.log("Error:", error);
                alert("큐시트 폼 등록 중 오류가 발생했습니다.");
            }
        } else {
            return;
        }
    };

    useEffect(()=>{
        getUploadData()
    },[setList, addOrder, rentalTime])

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
                    <ReadyDownload text={"공연 셋리스트 양식"} id={"setList"} img={setListImg} url={urls.setListForm} />
                    <ReadyDownload text={"대관 시간 양식"} id={"rentalTime"} img={rentalTimeImg} url={urls.rentalTimeForm} />
                    <ReadyDownload text={"추가 주문 양식"} id={"plus"} img={plus} url={urls.addOrderForm} />
                </div>
            </div>
            <div className="Qsheet_submit">
                <h4>제출하기</h4>
                <div className="submit_container">
                    <ReadySubmit text={"공연 셋리스트"} id={"setList"} onCheck={onCheck} name="setListForm" setForm={setSetList} />
                    <ReadySubmit text={"대관 시간"} id={"rentalTime"} onCheck={onCheck} name="rentalTimeForm" setForm={setRentalTime} />
                    <ReadySubmit text={"추가 주문 사항"} id={"plus"} onCheck={onCheck} name="addOrderForm" setForm={setAddOrder} />
                </div>
            </div>
            <div className="Qsheet_button">
                <Button text={"다음 단계"} type={"green"} onClick={checkQsheet}/>
            </div>
        </div>
    )
};

export default ReadyQsheet;