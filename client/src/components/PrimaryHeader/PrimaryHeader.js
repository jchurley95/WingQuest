import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const PrimaryHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #EEE;
    background: #333;
    padding: 10px 0px;
    font-size: 18px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 500;
`
const AppName = styled.div`
    padding: 15px;
    margin: 0px 10px;
    a {
        color #EEE;
        text-decoration: none;
    }
`
const Logout = styled.div`
    padding: 15px;
    margin: 0px 10px;
    border-radius: 3px;
    transition: background 0.1s;

    &:hover {
        cursor: pointer;
        background: #444;
    } 
`

const PrimaryHeader = (props) => {
    return (
        <PrimaryHeaderWrapper>
            <AppName><Link to="/">WING QUEST</Link></AppName>
            {props.isAuthenticated && <Logout onClick={props.logout}>Logout</Logout>}
        </PrimaryHeaderWrapper>
    );
};

export default PrimaryHeader;