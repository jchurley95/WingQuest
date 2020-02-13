import React from 'react';
import styled from 'styled-components';

const PrimaryHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #EEE;
    background: #333;
    padding: 10px;
    font-size: 18px;
`
const AppName = styled.div`
    padding: 15px;
`
const Logout = styled.div`
    padding: 15px;
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
            <AppName>Wing Spots</AppName>
            {props.isAuthenticated && <Logout onClick={props.logout}>Logout</Logout>}
        </PrimaryHeaderWrapper>
    );
};

export default PrimaryHeader;