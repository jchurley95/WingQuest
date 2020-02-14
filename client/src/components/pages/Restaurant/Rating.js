import React from 'react';
import styled from 'styled-components';

const RatingWrapper = styled.div`
    border: 1px solid #CCC;
    border-radius: 2px;
    padding: 15px;
    margin: 5px;
`

const Characteristics = styled.ul`
    list-style-type: square;
`
const Characteristic = styled.span`
    font-weight: bold;
    margin: 2px;
`
const Stars = styled.span`
    color: darkred;
    margin: 2px;
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
            <h3>{props.rating.flavor.toUpperCase()}</h3>
            <Characteristics>
                <li>
                    <Characteristic>Appearance:</Characteristic>
                    <Stars>{starRatings.appearance}</Stars>
                </li>
                <li>
                    <Characteristic>Aroma:</Characteristic>
                    <Stars>{starRatings.aroma}</Stars>
                </li>
                <li>
                    <Characteristic>Taste:</Characteristic>
                    <Stars>{starRatings.taste}</Stars>
                </li>
                <li>
                    <Characteristic>Size:</Characteristic>
                    <Stars>{starRatings.size}</Stars>
                </li>
                <li>
                    <Characteristic>Texture:</Characteristic>
                    <Stars>{starRatings.texture}</Stars>
                </li>
                <li>
                    <Characteristic>Value:</Characteristic>
                    <Stars>{starRatings.value}</Stars>
                </li>
                <li>
                    <Characteristic>Experience:</Characteristic>
                    <Stars>{starRatings.experience}</Stars>
                </li>
            </Characteristics>
        </RatingWrapper>
    );
};

export default Rating;