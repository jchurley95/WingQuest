import React from 'react';
import styled from 'styled-components';

const RatingsList = styled.div`
`

const Rating = styled.div`
    border: 1px solid #CCC;
    border-radius: 2px;
    padding: 15px;
    margin: 5px;
`

const Judgement = styled.ul`
    list-style-type: square;
`
const Value = styled.li`
`

const Ratings = (props) => {
    return (
        <div>
            <h3>Ratings</h3>
            <RatingsList>
                {
                    props.ratings.map((rating, index) => {
                        console.log(rating)
                        return (
                            <Rating key={index}>
                                <h4>{rating.flavor.toUpperCase()}</h4>
                                <Judgement>
                                    <Value>Appearance: {rating.appearance}</Value>
                                    <Value>Aroma: {rating.aroma}</Value>
                                    <Value>Tast: {rating.taste}</Value>
                                    <Value>Size: {rating.size}</Value>
                                    <Value>Texture: {rating.texture}</Value>
                                    <Value>Value: {rating.value}</Value>
                                    <Value>Experience: {rating.experience}</Value>
                                </Judgement>
                            </Rating>
                        )
                    })
                }
            </RatingsList>
        </div>
    );
};

export default Ratings;