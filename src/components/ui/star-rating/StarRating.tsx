import React, {FC, useState} from 'react';
import StarRating from 'react-star-ratings'
import {IStarRatingComponent} from "../../../types/propsTypes";


const StarRatingComponent:FC<IStarRatingComponent> = ({rate,changeRating}) => {
	return (
			<div>
				<StarRating
						rating={rate}
						//changeRating={ (newRate) => changeRating(newRate)}
						numberOfStars={5}
						name='rating'
						starRatedColor={'#6366f1'}
						// @ts-ignore
						isAggregateRating={true}
						starDimension={'25px'}
						starSpacing={'2px'}
						isSelectable={true}
				/>
			</div>
	);
};

export default StarRatingComponent;