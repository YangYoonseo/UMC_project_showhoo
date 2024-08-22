import React, { useState } from "react";
import RentalSearchButton from "./BookingSearchButton";
import RoundButton from "./RoundButton";
import RenderModal from "./Modal/RenderModal";
import "../../../styles/Jisu/RentalSearchBar.css";

const RentalSearchBar = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 상태
    const [selectedType, setSelectedType] = useState(""); // 선택된 유형 상태
    const [selectedLocation, setSelectedLocation] = useState({ Do: "", District: "" }); // 선택된 도와 구 상태

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
        console.log("선택된 날짜:", date); // 선택된 날짜를 콘솔에 출력
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        console.log("선택된 유형:", type); // 선택된 유형을 콘솔에 출력
    };

    const handleLocationSelect = (Do, District) => {
        setSelectedLocation({ Do, District });
        console.log("선택된 위치:", Do, District); // 선택된 도와 구를 콘솔에 출력
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
            />

            <div className="Divider"></div>
            <RoundButton 
                className="searchLocation"
                topic="지역"
                detail={selectedLocation.Do ? `${selectedLocation.Do} ${selectedLocation.District}` : "지역 검색"}
                // 선택된 지역이 있으면 표시, 없으면 기본 텍스트
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
                // 선택된 날짜가 있으면 표시, 없으면 기본 텍스트
                index={2}
                isClicked={activeButton === 2}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(2)}
                style={{
                    padding: '0px 60px 0px 40px',
                    width: '208px'  // width를 208px로 고정
                }} 
            />

            <div className="Divider"></div>
            <RoundButton
                className="searchType"
                topic="유형"
                detail={selectedType ? `${selectedType}` : "공연장 유형 추가"}
                // 선택된 유형이 있으면 표시, 없으면 기본 텍스트
                index={3}
                isClicked={activeButton === 3}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(3)}
                style={{
                    padding: '0px 153px 0px 40px',
                    width: '323px'  // width를 208px로 고정
                }} 
            />

            <RentalSearchButton size="size65" />

            <RenderModal
                className="Modal"
                isOpen={isModalOpen}
                onClose={closeModal}
                index={modalContent}
                onDateSelect={handleDateSelect} // 날짜 선택 핸들러 전달
                onTypeSelect={handleTypeSelect} // 유형 선택 핸들러 전달
                onLocationSelect={handleLocationSelect} // 위치 선택 핸들러 전달
            />
        </div>
    );
};

export default RentalSearchBar;
