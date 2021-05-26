import React, { FC, ReactElement, Suspense, useContext } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { Register } from './Register';
import { Market } from './Market';
import { GlobalContext } from '../core/context/global-context';
import { Login } from './Login';
import PageLoading from './PageLoading';
import useRouter from '../core/hooks/useRouter';
import { Transfer } from './Transfer';

const Header = styled.div``;
const Footer = styled.div``
const Body = styled.div`
  background: #F6F5F7;
  padding: 50px;
`;

const AuthRoute: FC<{
  component: FC;
  path: string;
  exact: boolean;
}> = ({ component: Component, ...rest }): ReactElement => {
  const { user } = useContext(GlobalContext);
  const { location } = useRouter();
  
  return (
    <Route
      {...rest}
      render={ props =>
        !!user ?
          <Component key={location.pathname} {...props} />
          :
          <Redirect to="/login" />
      }
    />
  );
}

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Body>
        <BrowserRouter>
          <Switch>
            <Suspense fallback={<PageLoading />}>
              <Route path="/" exact component={Market} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/transfer" component={Transfer} />
            </Suspense>
          </Switch>
        </BrowserRouter>
      </Body>
     <Footer />
    </div>
  );
}

export default App;
