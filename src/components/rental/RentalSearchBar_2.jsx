import React, { useState } from "react";
import RentalSearchButton from "../_test_/Booking/BookingSearchButton";
import RoundButton from "../_test_/Booking/RoundButton";
import RenderModal from "../_test_/Booking/Modal/RenderModal";
import "../../styles/Jisu/RentalSearchBar_2.css";

const RentalSearchBar_2 = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

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
        <div className="BookingSearchBar2">
            <RoundButton 
                topic="모두"
                index={0}
                isClicked={activeButton === 0}
                onOpenModal={() => openModal(0)}
                style={{ padding: '0px 36px 0px 53px' }} 
            />
            <div className="Divider"></div>
            <RoundButton
                topic="서울 마포구"
                index={1}
                isClicked={activeButton === 1}
                onOpenModal={() => openModal(1)}
                style={{ padding: '0px 36px 0px 36px' }} 
            />
            <div className="Divider"></div>
            <RoundButton 
                topic="2024-08-13"
                index={2}
                isClicked={activeButton === 2}
                onOpenModal={() => openModal(2)}
                style={{ padding: '0px 36px 0px 36px' }} 
            />
            <div className="Divider"></div>
            <RoundButton 
                topic="콘서트홀"
                index={3}
                isClicked={activeButton === 3}
                onOpenModal={() => openModal(3)}
                style={{ padding: '0px 106px 0px 46px' }} 
            />
            <RentalSearchButton size="size46" /> {/* 버튼 크기 조정 */}
            <RenderModal
                className="Modal"
                isOpen={isModalOpen}
                onClose={closeModal}
                index={modalContent}
            />
        </div>
    );
};

export default RentalSearchBar_2;