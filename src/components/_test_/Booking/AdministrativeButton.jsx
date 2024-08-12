import { useState } from "react";
import "../../../styles/Jisu/AdministrativeButton.css"

const AdministrativeButton = (CityName) => {

    
    return <button className="CityName"
        onClick={() => {
            
        }}>
        <div>
            {CityName}
        </div>
        <div className="CityArrow">

        </div>
    </button>
}

export default AdministrativeButton;