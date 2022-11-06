import React, {FC} from 'react';
import {IDevice} from "../../../types/queryTypes";
import styled from './DeviceItem.module.scss'
import star from './../../../image/bigstar.png'

const DeviceItem:FC<{device: IDevice}> = ({device}) => {

	let format = (price:number):string => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			maximumFractionDigits: 0
		}).format(price)
	}

	return (
			<div className={styled.item}>
				<div className={styled.image}>
					<img src={device.img} alt={device.name}/>
				</div>

				<div className={styled.description}>
					<div className={styled.heading}>{device.name}</div>
					<div className={styled.price}>{format(Number(device.price))}</div>
					<div className={styled.rate}>
						<img src={star} alt={device.rating}/>
						<div>{device.rating}</div>
					</div>
				</div>
			</div>
	);
};

export default DeviceItem;