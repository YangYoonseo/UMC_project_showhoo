import { useState } from "react";
import "../../../../../styles/Jisu/DistrictButton.css"

const DistrictButton = ({className ="", text="", onclick}) => {
    return <button className={`DistrictButton ${className}`}>
        {text}
    </button>
}

export default DistrictButton;