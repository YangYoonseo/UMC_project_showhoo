import React, { useState } from "react";
import RentalSearchButton from "./BookingSearchButton";
import RoundButton from "./RoundButton";
import RenderModal from "./Modal/RenderModal";
import "../../../styles/Jisu/RentalSearchBar.css";

const RentalSearchBar = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null); // 추가: 모달 내용 상태

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

    return (
        <div className="BookingSearchBar">
            <RoundButton 
                topic="공연장"
                detail="공연장 검색"
                index={0}
                isClicked={activeButton === 0}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(0)} // 다른 모달 내용 전달
                style={{}} 
            />

            <div className="Divider"></div>
            <RoundButton 
                topic="지역"
                detail="지역 검색"
                index={1}
                isClicked={activeButton === 1}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(1)}
                style={{padding: '0px 80px 0px 40px'}} 
            />

            <div className="Divider"></div>
            <RoundButton 
                topic="날짜"
                detail="공연날짜 추가"
                index={2}
                isClicked={activeButton === 2}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(2)} // 다른 모달 내용 전달
                style={{padding: '0px 60px 0px 40px'}} 
            />

            <div className="Divider"></div>
            <RoundButton 
                topic="유형"
                detail="공연장 유형 추가"
                index={3}
                isClicked={activeButton === 3}
                onClick={handleButtonClick}
                onOpenModal={() => openModal(3)} // 다른 모달 내용 전달
                style={{padding: '0px 173px 0px 40px'}} 
            />

            <RentalSearchButton size="size65" />

            <RenderModal className="Modal"
                isOpen={isModalOpen}
                onClose={closeModal}
                index={modalContent}
            />
        </div>
    );
};

export default RentalSearchBar;
