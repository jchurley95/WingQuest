import React from 'react';
import styled from 'styled-components';

const RatingWrapper = styled.div`
    border: 1px solid #CCC;
    border-radius: 2px;
    padding: 15px;
    margin: 5px;
`

const Judgement = styled.ul`
    list-style-type: square;
`
const Value = styled.li`
    color: #777;
`

function getStars(numberOfStars, filled) {
    let stars = [];
    for(var i=0; i < numberOfStars; i++){
        stars.push(String.fromCharCode(filled ? 9733: 9734))
    }
    return stars.toString().replace(/,/g, " ");
}


const Rating = (props) => {
    const starRatings = {};
    Object.keys(props.rating).forEach(key => {
        if (key !== "id") {
            starRatings[key] = getStars(props.rating[key], true) + " " + getStars(5 - props.rating[key], false);
        }
    });
    return (
        <RatingWrapper>
            <h4>{props.rating.flavor.toUpperCase()}</h4>
            <Judgement>
                <Value>Appearance: {starRatings.appearance}</Value>
                <Value>Aroma: {starRatings.aroma}</Value>
                <Value>Tast: {starRatings.taste}</Value>
                <Value>Size: {starRatings.size}</Value>
                <Value>Texture: {starRatings.texture}</Value>
                <Value>Value: {starRatings.value}</Value>
                <Value>Experience: {starRatings.experience}</Value>
            </Judgement>
        </RatingWrapper>
    );
};

export default Rating;