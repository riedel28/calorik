import React, { useState } from 'react';

const UserDataContext = React.createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const value = { userData, setUserData };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

const useUserData = () => {
  const context = React.useContext(UserDataContext);

  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }

  return context;
};

export { UserDataProvider, useUserData };
