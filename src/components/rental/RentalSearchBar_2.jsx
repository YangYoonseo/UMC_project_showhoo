import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RentalSearchButton from "../_test_/Booking/BookingSearchButton";
import RoundButton from "../_test_/Booking/RoundButton";
import RenderModal from "../_test_/Booking/Modal/RenderModal";
import "../../styles/Jisu/RentalSearchBar_2.css";

const RentalSearchBar_2 = () => {
    // useLocation 훅을 사용하여 이전 페이지에서 전달된 상태(state)를 가져옵니다.
    const location = useLocation();

    // 전달된 상태가 없으면 빈 객체로 초기화합니다.
    const searchValues = location.state || {};

    // 각 검색 필드를 전달된 상태에서 가져오거나, 없을 경우 기본값("모두")으로 설정합니다.
    const searchName = searchValues.searchName || "모두";
    const selectedLocation = searchValues.selectedLocation || { Do: "모두", District: "모두" };
    const selectedDate = searchValues.selectedDate || "모두";
    const selectedType = searchValues.selectedType || "모두";

    // 현재 클릭된 버튼을 추적하기 위한 상태를 설정합니다.
    const [activeButton, setActiveButton] = useState(null);

    // 모달의 열림 상태와 콘텐츠를 관리하기 위한 상태를 설정합니다.
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    // 버튼 클릭 시 활성화된 버튼 인덱스를 설정합니다.
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    // 모달을 열고, 해당 모달에 대한 콘텐츠 인덱스를 설정합니다.
    const openModal = (index) => {
        setModalContent(index);
        setIsModalOpen(true);
    };

    // 모달을 닫고, 콘텐츠를 초기화합니다.
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    // 'Do'와 'District'가 모두 "모두"일 때 "모두"를 표시하고, 그렇지 않으면 두 값을 결합합니다.
    const locationDisplay = selectedLocation.Do === "모두" && selectedLocation.District === "모두"
        ? "모두"
        : `${selectedLocation.Do} ${selectedLocation.District}`;

    return (
        <div className="BookingSearchBar2">
            {/* 이름 검색 필드 */}
            <RoundButton 
                topic={searchName}  // 검색된 이름 또는 기본값 "모두"를 표시합니다.
                style={{ padding: '0px 36px 0px 53px' }}  // 버튼 스타일 설정
            />
            <div className="Divider"></div>
            <RoundButton
                topic={locationDisplay.trim()}
                style={{ padding: '0px 36px 0px 36px' }} 
            />
            <div className="Divider"></div>
            <RoundButton 
                topic={selectedDate}
                style={{ padding: '0px 36px 0px 36px' }} 
            />
            <div className="Divider"></div>
            <RoundButton 
                topic={selectedType}
                style={{ padding: '0px 106px 0px 46px' }} 
            />
            
            {/* 검색 버튼 */}
            <RentalSearchButton size="size46" />

            {/* 모달 렌더링 */}
            <RenderModal
                className="Modal"
                isOpen={isModalOpen}  // 모달 열림 여부 확인
                onClose={closeModal}  // 모달 닫기 핸들러 설정
                index={modalContent}  // 모달 콘텐츠 인덱스 설정
            />
        </div>
    );
};

export default RentalSearchBar_2;
