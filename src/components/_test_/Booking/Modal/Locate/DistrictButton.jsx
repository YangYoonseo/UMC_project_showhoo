import React from "react";
import "../../../../../styles/Jisu/DistrictButton.css";

const DistrictButton = ({ className = "", text = "", onClick }) => {
    return (
        <button className={`DistrictButton ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default DistrictButton;
