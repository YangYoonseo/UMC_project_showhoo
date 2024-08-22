import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RentalSearchButton from "./BookingSearchButton";
import RoundButton from "./RoundButton";
import RenderModal from "./Modal/RenderModal";
import "../../../styles/Jisu/RentalSearchBar.css";
import axios from "axios";

const RentalSearchBar = () => {
    const nav = useNavigate();
    const [activeButton, setActiveButton] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(""); 
    const [selectedType, setSelectedType] = useState(""); // 화면에 보이는 타입
    const [mappedType, setMappedType] = useState(""); // API에 전달될 매핑된 타입
    const [selectedLocation, setSelectedLocation] = useState({ Do: "", District: "" }); 
    const [searchName, setSearchName] = useState(""); 
    
    // 타입 매핑 테이블
    const typeMapping = {
        "콘서트홀": "CONCERTHALL",
        "아트홀": "ARTHALL",
        "대공연장": "GRANDHALL",
        "소공연장": "SMALLHALL",
        "대극장": "GRANDTHEATER",
        "소극장": "SMALLTHEATER",
    };

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const openModal = (index) => {
        setModalContent(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log("선택된 날짜:", date); 
    };

    const handleTypeSelect = (type) => {
        // 사용자 선택 값을 매핑된 값으로 변환
        const mapped = typeMapping[type] || type; // 매핑되지 않은 경우 원래 값을 사용
        setSelectedType(type); // 화면에 표시될 원래 값 설정
        setMappedType(mapped); // API에 전달될 매핑된 값 설정
        console.log("선택된 유형:", type, "\n매핑된 값:", mapped);
    };

    const handleLocationSelect = (Do, District) => {
        setSelectedLocation({ Do, District });
        console.log("선택된 위치:", Do, District);
    };

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
        console.log("검색할 공연장 이름: ", event.target.value);
    };

    const handleSearchButtonClick = () => {
        // 버튼 클릭시 같이 넘겨줄 값
        const searchValues = {
        searchName,
        selectedLocation,
        selectedDate,
        selectedType,
        };
        
        const baseUrl = "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/search";
        const queryParams = new URLSearchParams();
        if (searchName) queryParams.append("name", searchName);
        if (selectedLocation.Do) queryParams.append("city", selectedLocation.Do);
        if (selectedLocation.District) queryParams.append("district", selectedLocation.District);
        if (selectedDate) queryParams.append("date", selectedDate);
        if (mappedType) queryParams.append("type", mappedType); // 변환된 타입 사용

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        console.log("검색 API 호출로 생성된 URL:", fullUrl);

        axios.get(fullUrl)
            .then(response => {
                console.log("[검색] API 응답 데이터:", response.data);
            })
            .catch(error => {
                console.error("[검색] API 호출 오류:", error);
            });
        
        // 검색 값을 state로 전달하면서 페이지 이동
        nav("/rental_search", { state: searchValues });
    };

    return (
        <div className="BookingSearchBar">
            <RoundButton 
                className="searchHall"
                topic="공연장"
                detail="공연장 검색"
                index={0}
                isClicked={activeButton === 0}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(0)}
                style={{
                    width: '211px'
                }} 
                value={searchName}
                onChange={handleSearchNameChange} 
            />

            <div className="Divider"></div>
            <RoundButton 
                className="searchLocation"
                topic="지역"
                detail={selectedLocation.Do ? `${selectedLocation.Do} ${selectedLocation.District}` : "지역 검색"}
                index={1}
                isClicked={activeButton === 1}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(1)}
                style={{
                    padding: '0px 100px 0px 40px',
                    width: '214px'
                }} 
            />

            <div className="Divider"></div>
            <RoundButton 
                className="searchDate"
                topic="날짜"
                detail={selectedDate ? `${selectedDate}` : "공연날짜 추가"}
                index={2}
                isClicked={activeButton === 2}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(2)}
                style={{
                    padding: '0px 60px 0px 40px',
                    width: '208px'
                }} 
            />

            <div className="Divider"></div>
            <RoundButton
                className="searchType"
                topic="유형"
                detail={selectedType ? `${selectedType}` : "공연장 유형 추가"}
                index={3}
                isClicked={activeButton === 3}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(3)}
                style={{
                    padding: '0px 153px 0px 40px',
                    width: '323px'
                }} 
            />

            <RentalSearchButton size="size65" onClick={handleSearchButtonClick}/>

            <RenderModal
                className="Modal"
                isOpen={isModalOpen}
                onClose={closeModal}
                index={modalContent}
                onDateSelect={handleDateSelect}
                onTypeSelect={handleTypeSelect}
                onLocationSelect={handleLocationSelect}
            />
        </div>
    );
};

export default RentalSearchBar;
