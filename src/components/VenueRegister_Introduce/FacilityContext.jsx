import React, { createContext, useState } from 'react';

// 1. Context를 생성합니다.
export const FacilityContext = createContext();

// 2. Provider 컴포넌트를 정의합니다.
export const FacilityProvider = ({ children }) => {
  const [soundEquipment, setSoundEquipment] = useState('');
  const [lightingEquipment, setLightingEquipment] = useState('');
  const [stageMachinery, setStageMachinery] = useState('');
  const [spaceDrawing, setSpaceDrawing] = useState('');
  const [spacestaff, setSpacestaff] = useState('');
  const [spaceSeat, setSpaceSeat] = useState('');

  return (
    <FacilityContext.Provider
      value={{
        soundEquipment,
        setSoundEquipment,
        lightingEquipment,
        setLightingEquipment,
        stageMachinery,
        setStageMachinery,
        spaceDrawing,
        setSpaceDrawing,
        spacestaff,
        setSpacestaff,
        spaceSeat,
        setSpaceSeat,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};