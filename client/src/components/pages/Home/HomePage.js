import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Restaurant from './Restaurant';
import { BounceyLoader } from 'react-loaders-spinners';

const HomePageWrapper = styled.div`
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const RestaurantList = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Loading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const HomePage = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loadingData, toggleLoadingData] = useState(true);
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
        }).finally(() => {
            toggleLoadingData(false);
        })
    }, [props.auth])
    if (loadingData) {
        return (
            <Loading>
                <BounceyLoader loading={loadingData} />
            </Loading>
        )
    }
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