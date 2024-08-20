import { createContext, useContext, useState } from "react";

const ProfileIdContext = createContext();

export const ProfileIdProvider = ({ children }) => {
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  return (
    <ProfileIdContext.Provider
      value={{ selectedProfileId, setSelectedProfileId }}
    >
      {children}
    </ProfileIdContext.Provider>
  );
};

export const useProfileId = () => useContext(ProfileIdContext);
