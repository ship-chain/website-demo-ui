import { UserEntity } from '@ship-website-demo/common';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { apiGetUser } from '../api/api';

const GlobalContext: React.Context<{
  user: UserEntity | undefined;
  logout: () => void;
}> = React.createContext({} as any);

interface Props {
  children?: React.ReactNode;
}

const GlobalContextProvider = React.memo(
  ({ children }: Props): ReactElement =>  {
    const [ user, setUser ] = useState<UserEntity>();
  
    const logout = useCallback(() => setUser(undefined), []);
  
    useEffect(() => {
      apiGetUser().then(user => setUser(user));
    }, []);
  
    return (
      <GlobalContext.Provider
        value={{
          user,
          logout,
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  }
);

export { GlobalContext , GlobalContextProvider };
