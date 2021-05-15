import { UserEntity } from '@ship-website-demo/common';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { apiGetUser } from '../api/api';

const GlobalContext: React.Context<{
  user: UserEntity | undefined;
  logout: () => void;
  update: () => void;
}> = React.createContext({} as any);

interface Props {
  children?: React.ReactNode;
}

const GlobalContextProvider = React.memo(
  ({ children }: Props): ReactElement =>  {
    const [ user, setUser ] = useState<UserEntity>();
    const [ signal, updateSignal ] = useState(0);
  
    const logout = useCallback(() => setUser(undefined), []);
    const update = useCallback(() => updateSignal(now => now + 1), [updateSignal]);
  
    useEffect(() => {
      console.log('apiGetUser');
      
      apiGetUser().then(user => setUser(user));
    }, [signal]);
  
    return (
      <GlobalContext.Provider
        value={{
          user,
          logout,
          update,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  }
);

export { GlobalContext , GlobalContextProvider };
