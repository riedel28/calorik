'use client';

import React, { useState } from 'react';

import type { PersonalDataFormValues as UserData } from '@/app/[locale]/components/personal-data-form/personal-data-form';

interface UserDataContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
}

const UserDataContext = React.createContext({} as UserDataContextType);

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<null | UserData>(null);

  const value: UserDataContextType = { userData, setUserData };
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
