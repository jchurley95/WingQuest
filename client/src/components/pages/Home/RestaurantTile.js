import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const RestaurantWrapper = styled.div`
    border: 1px solid #CCC;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MoreDetails = styled.div`
    align-self: flex-end;

    a {
        color: #006699;
    }
`

const Restaurant = (props) => {
    return (
        <RestaurantWrapper>
            <h2>{props.restaurant.name}</h2>
            <MoreDetails>
                <Link to={`/restaurant/${props.restaurant.id}`}>More Details ></Link>
            </MoreDetails>
        </RestaurantWrapper>
    );
};

export default Restaurant;