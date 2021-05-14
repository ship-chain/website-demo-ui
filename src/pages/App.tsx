import React, { FC, ReactElement, Suspense, useContext } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { Register } from './Register';
import { Market } from './Market';
import { GlobalContext } from '../core/context/global-context';
import { Login } from './Login';
import PageLoading from './PageLoading';
import useRouter from '../core/hooks/useRouter';

const Header = styled.div``;
const Footer = styled.div``
const Body = styled.div`
  background: #F6F5F7;
  padding: 50px;
`;

const AuthRoute: FC<{
  component: FC;
  path: string;
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
            <AuthRoute path="/" component={Market} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            {/* <Route path="/user" exact component={ExtrinsicHolder} /> */}
          </Suspense>
        </Switch>
      </BrowserRouter>
      </Body>
     <Footer />
    </div>
  );
}

export default App;
