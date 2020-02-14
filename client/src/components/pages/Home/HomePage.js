import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Restaurant from './Restaurant'

const HomePageWrapper = styled.div`
    padding: 50px;
`
const RestaurantList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const HomePage = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        let access_token = props.auth ? JSON.parse(props.auth).access_token : null;
        axios({
            method: "get",
            url: "/api/restaurants",
            headers: {access_token}
        }).then(response => {
            setRestaurants(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <HomePageWrapper className="page">
            <RestaurantList>
                {
                    restaurants.map((restaurant, index) => {
                        return (
                            <Restaurant 
                                key={index}
                                restaurant={restaurant}
                            />
                        )
                    })
                }
            </RestaurantList>
        </HomePageWrapper>
    );
};

export default HomePage;