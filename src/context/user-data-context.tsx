'use client';

import React, { useState } from 'react';

import type { ProjectionFormValues as UserData } from '@/app/[locale]/components/projection-form/projection-form';

interface UserDataContextType {
  setUserData: (data: UserData) => void;
  userData: UserData | null;
}

const UserDataContext = React.createContext({} as UserDataContextType);

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<null | UserData>(null);

  const value: UserDataContextType = { setUserData, userData };
  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

const useUserData = () => {
  const context = React.useContext(UserDataContext);

  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }

  return context;
};

export { UserDataProvider, useUserData };
