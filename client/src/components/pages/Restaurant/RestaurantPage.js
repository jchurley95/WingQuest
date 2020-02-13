import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RestaurantPageWrapper = styled.div`

`

const RestaurantPage = (props) => {
    const [restaurant, setRestaurant] = useState({});
    console.log(props.match.params.restaurantId)
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: `/api/restaurants/${props.match.params.restaurantId}`
    //     })
    // }, [])
    return (
        <RestaurantPageWrapper>
            {restaurant.name}
        </RestaurantPageWrapper>
    );
};

export default RestaurantPage;