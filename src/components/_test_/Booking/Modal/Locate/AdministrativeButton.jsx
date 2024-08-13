import { useState } from "react";
import "../../../../../styles/Jisu/AdministrativeButton.css"

const AdministrativeButton = ({className ="", text=""}) => {
    return <button className={`AdministrativeButton ${className}`}>
        {text}
    </button>
}

export default AdministrativeButton;