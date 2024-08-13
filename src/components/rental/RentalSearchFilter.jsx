import React, { useState } from 'react';
import "../../styles/Jisu/RentalSearchFilter.css";
import RentalSearchFilterModal from "./RentalSearchFilterModal"

const RentalSearchFilter = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="RentalSearchFilter" onClick={openModal}>
                <div className="FilterIcon">※</div>
                <div className="FilterFont">필터</div>
            </button>
            {isModalOpen && <RentalSearchFilterModal isOpen={isModalOpen} onClose={closeModal} />}
        </>
    );
};

export default RentalSearchFilter;
