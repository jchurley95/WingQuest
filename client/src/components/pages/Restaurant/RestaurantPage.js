import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RestaurantPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`

const Image = styled.img`
    max-width: 300px;
    max-height: 300px;
`

const Value = styled.div`
    margin-left: 15px;
`

const RestaurantPage = (props) => {
    const [restaurant, setRestaurant] = useState({});
    const [loadingData, toggleLoadingData] = useState(true);
    let access_token = props.auth ? JSON.parse(props.auth).access_token : null
    useEffect(() => {
        let url = `/api/restaurants/${props.match.params.restaurantId}`;
        axios({
            method: 'get',
            url,
            headers: {access_token}
        }).then(response => {
            toggleLoadingData(false);
            setRestaurant(response.data);
        }).catch(err => {
            toggleLoadingData(false);
            console.log(err);
        })
    }, [])
    let address2 = restaurant.address2 ? ` ${restaurant.address2}` : "";
    let location = restaurant.address1 ? `${restaurant.address1}${address2} ${restaurant.city}, ${restaurant.state} ${restaurant.zip}` : null;
    return (
        <RestaurantPageWrapper className="page">
            <h1>{restaurant.name}</h1>
            <Image src={restaurant.imageUrl} alt={!loadingData ? "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/12/13/0/FNM_010110-Wings-009-B_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382539269816.jpeg" : ""} />
            <div>
                <h4>Hours </h4>
                <Value>{restaurant.businessHours}</Value>
                <h4>Location </h4>
                <Value>{location}</Value>
            </div>
            {/* Use lat long to display map */}
        </RestaurantPageWrapper>
    );
};

export default RestaurantPage;