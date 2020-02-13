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
`

function App() {
  const [auth, setAuth] = useLocalStorage('Authorization', null);
  const [isAuthenticated, toggleIsAuthenticated] = useState(false);
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
  const loginPage = () => (
    <LoginPage handleAuth={handleAuth} isAuthenticated={isAuthenticated}/>
  )
  const homePage = () => (
    <HomePage auth={auth} />
  )
  const restaurantPage = (props) => (
    <RestaurantPage auth={auth} {...props} />
  )
  const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest}
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
