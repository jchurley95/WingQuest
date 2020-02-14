import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Rating from './Rating';
import _ from 'lodash';
import { BounceyLoader } from 'react-loaders-spinners';

const RestaurantPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
`

const Image = styled.img`
    max-width: 300px;
    max-height: 300px;
`

const Value = styled.div`
    margin-left: 15px;
`

const Loading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const RestaurantPage = (props) => {
    const [restaurant, setRestaurant] = useState({});
    const [ratings, setRatings] = useState([]);
    const [loadingData, toggleLoadingData] = useState(true);
    let access_token = props.auth ? JSON.parse(props.auth).access_token : null
    useEffect(() => {
        let restaurantUrl = `/api/restaurants/${props.match.params.restaurantId}`;
        let ratingUrl = `/api/ratings/${props.match.params.restaurantId}/rating`;
        let headers = {access_token}
        axios.all([
            axios({method: 'get', url: restaurantUrl, headers}),
            axios({method: 'get', url: ratingUrl, headers})
        ]).then(axios.spread(function(restaurantResp, ratingResp) {
            setRestaurant(restaurantResp.data);
            setRatings(ratingResp.data);
        })).catch(err => {
            console.log(err);
        }).finally(() => {
            toggleLoadingData(false);
        })
    }, [])

    let address2 = restaurant.address2 ? ` ${restaurant.address2}` : "";
    let location = restaurant.address1 ? `${restaurant.address1}${address2} ${restaurant.city}, ${restaurant.state} ${restaurant.zip}` : null;
    if (loadingData) {
        return (
            <Loading>
                <BounceyLoader loading={loadingData} />
            </Loading>
        )
    }
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
            <h3>Ratings</h3>
            <div>
                {
                    _.orderBy(ratings, 'flavor', 'asc').map((rating, index) => {
                        return (
                            <Rating key={index} rating={rating}/>
                        )
                    })
                }
            </div>
        </RestaurantPageWrapper>
    );
};

export default RestaurantPage;