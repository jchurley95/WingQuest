import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';

const LoginPageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`
const LoginBox = styled.div`
    padding: 50px;
    border: 1px solid #CCC;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
`
const SignIn = styled.h1`
    text-align: center;
`
const Label = styled.label`
    margin: 5px;
`
const Input = styled.input`
    padding: 15px;
    font-size: 16px;
    border: 1px solid #CCC;
`
const LoginButton = styled.button`
    padding: 0.46em 1.6em;
    border: 0.1em solid #444;
    margin: 5px;
    border-radius: 0.12em;
    font-size: 16px;
    cursor: pointer;
`
const LoginError = styled.div`
    color: red;
`

const LoginPage = (props) => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginError, setLoginError] = useState(null);
    function attemptLogin() {
        if (usernameInput && passwordInput) {
            if (loginError) {setLoginError(null)};
            axios.post("/api/auth/getToken", {
                    username: usernameInput, 
                    password: passwordInput
            }).then(response => {
                props.handleAuth(response.data);
            }).catch(err => {
                console.log(err)
                setLoginError("Invalid username/password");
            })
        } else {
            setLoginError("Missing username/password");
        }
    }
    if (props.isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <LoginPageWrapper className="page">
            <LoginBox>
                <SignIn>Sign In</SignIn>
                <Label htmlFor="username-input">
                    <Input 
                        type="text" 
                        name="username-input" 
                        placeholder="Enter username"
                        onChange={(e) => {setUsernameInput(e.target.value)}} 
                    />
                </Label>
                <Label htmlFor="password-input">
                    <Input 
                        type="password" 
                        name="password-input" 
                        placeholder="Enter password"
                        onChange={(e) => {setPasswordInput(e.target.value)}} 
                    />
                </Label>
                <LoginButton onClick={attemptLogin}>Login</LoginButton>
                <LoginError>{loginError}</LoginError>
            </LoginBox>
        </LoginPageWrapper>
    );
};

export default LoginPage;