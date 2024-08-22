import "../../styles/Eojin/readyQsheet.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Button from "../common/Button";
import ReadySubmit from "./readySubmit";
import ReadyDownload from "./readyDownload";

import setList from "../../assets/img_Ready/setList.svg";
import rentalTime from "../../assets/img_Ready/rentalTime.svg";
import plus from "../../assets/img_Ready/plus.svg";

const ReadyQsheet = ({ nextStep, check, setShowId, showId }) => {
    const location = useLocation();
    console.log("location:", location);
    const spaceApplyId = location.state.id || "받아오지 못함";
    console.log("spaceApplyId:", spaceApplyId);

    // 큐시트 form 업로드 확인 
    const [ qsheet, setQsheet ] = useState ([
        {
            setList: false,
            rentalTime: false,
            plus: false,
        }
    ]);

    const [ setListForm, setSetListForm ] = useState('');
    const [ rentalTimeForm, setRentalTimeForm ] = useState('');
    const [ addOrderForm, setAddOrderForm ] = useState('');

    // 작성된 큐시트 url 
    const [urls, setUrls] = useState({
        setList: '',
        rentalTime: '',
        addOrder: ''
    });

    // 큐시트 form 업로드 체크 
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

    // 큐시트 업로드 전체 확인 
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

    // 큐시트 폼 업로드 하기 
    async function getUploadData() {
        if (setListForm && addOrderForm && rentalTimeForm) {
            const token = sessionStorage.getItem("accessToken");

            const getSetListForm = setListForm;
            const getAddOrderForm = addOrderForm;
            const getRentalTimeForm = rentalTimeForm;

            const formData = new FormData();
            formData.append("setListForm", JSON.stringify(getSetListForm));
            formData.append("addOrderForm", JSON.stringify(getAddOrderForm));
            formData.append("rentalTimeForm", JSON.stringify(getRentalTimeForm));

            console.log("서버로 전송할 데이터:", formData);

            try {
                const res = await axios.post(
                    `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/space/${spaceApplyId}/prepare`,
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
    },[setListForm, addOrderForm, rentalTimeForm])

    // 작성된 큐시트 다운 받기 
    async function getDownloadData() {
        if (showId) {
            const token = sessionStorage.getItem("accessToken");
            try {
                const res = await axios.get(
                    `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/space/${showId}/prepare`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },           
                    }
                );
                const { setList, rentalTime, addOrder } = res.data.result;
                setUrls({ setList, rentalTime, addOrder });
                console.log("다운로드 양식 보기", res.data);
            } catch (error) {
                console.log("Error:", error);
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        getDownloadData();
    }, []);

    useEffect(() => {
        console.log(urls)
    }, [urls]);

    return (
        <div className="ReadyQsheet">
            <div className="Qsheet_submit">
                <h4>업로드하기</h4>
                <p>공연자가 대관을 위해 제출해야 할 신청서 및 양식을 업로드해주세요.</p>
                <div className="submit_container">
                    <ReadySubmit text={"공연 셋리스트"} id={"setList"} onCheck={onCheck} setSetListForm={setSetListForm}/>
                    <ReadySubmit text={"대관 시간"} id={"rentalTime"} onCheck={onCheck} setListForm={setRentalTimeForm} />
                    <ReadySubmit text={"추가 주문 사항"} id={"plus"} onCheck={onCheck} setAddOrderForm={setAddOrderForm} />
                </div>
            </div>
            <div className="Qsheet_download">
                <h4>다운받기</h4>
                <p>공연자가 제출한 서류들입니다. 클릭하여 다운받아주세요.</p>
                <div className="download_container">
                    <ReadyDownload text={"공연 셋리스트 양식"} id={"setList"} img={setList} url={urls.setList} />
                    <ReadyDownload text={"대관 시간 양식"} id={"rentalTime"} img={rentalTime} url={urls.rentalTime} />
                    <ReadyDownload text={"추가 주문 양식"} id={"plus"} img={plus} url={urls.addOrder} />
                </div>
            </div>
            <div className="Qsheet_button">
                <Button text={"다음 단계"} type={"green"} onClick={nextStep}/>
            </div>
        </div>
    )
};

export default ReadyQsheet;