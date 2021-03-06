import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import styled from 'styled-components';
import PrimaryHeader from './components/PrimaryHeader/PrimaryHeader';
import LoginPage from './components/pages/Login/LoginPage';
import HomePage from './components/pages/Home/HomePage';
import RestaurantPage from './components/pages/Restaurant/RestaurantPage';
import useLocalStorage from 'react-use-localstorage';

const AppWrapper = styled.div`
  font-size: 16px;
  color: #444;

  .page {
    padding-top: 100px;
  }
`

function App() {
  const [auth, setAuth] = useLocalStorage('Authorization', localStorage.getItem('Authorization'));
  const [isAuthenticated, toggleIsAuthenticated] = useState(checkIfUserHasAuthentication());
    useEffect(() => {
      toggleIsAuthenticated(checkIfUserHasAuthentication());
    }, [auth]);
  function handleAuth(authResponse) {
    setAuth(JSON.stringify(authResponse));
  }
  function checkIfUserHasAuthentication() {
    return auth && (auth.includes("access_token") && JSON.parse(auth).access_token);
  }
  function logout() {
    setAuth('');
  }
  const loginPage = (props) => (
    <LoginPage handleAuth={handleAuth} isAuthenticated={isAuthenticated} {...props}/>
  )
  const homePage = (props) => (
    <HomePage auth={auth} {...props} />
  )
  const restaurantPage = (props) => (
    <RestaurantPage auth={auth} {...props} />
  )
  const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} exact
      render={(props) => (
        isAuthenticated
        ?
        <Component {...props} {...rest}/>
        :
        <Redirect to="/login" />
      )}
    />
  }
  return (
    <Router>
      <AppWrapper className="App">
        <PrimaryHeader logout={logout} isAuthenticated={isAuthenticated} />
        <Switch>
          <Route path="/login" render={loginPage} />
          <PrivateRoute path="/restaurant/:restaurantId" component={restaurantPage} />
          <PrivateRoute path="/" component={homePage} />
          <Redirect from="*" to="/"/>
        </Switch>
      </AppWrapper>
    </Router>
  );
}

export default App;
