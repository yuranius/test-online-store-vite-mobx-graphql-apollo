import React, {FC} from 'react';
import styled from './DeviceItem.module.scss'
import star from './../../../image/bigstar.png'
import { format } from '../../../utils/formatter';
import {Link} from "react-router-dom";
import cn from "classnames";
import {IDevice} from "../../../types/queryTypes";

const DeviceItem:FC<{device: IDevice}> = ({device}) => {
	return (
			<Link to={'./device/'+ device.id}  className={cn(styled.item, 'dark:border-indigo-100 ')}>
				<div className={styled.image}>
					<img src={device.img} alt={device.name}/>
				</div>

				<div className={styled.description}>
					<div className={cn(styled.heading, 'dark:text-blue-100')}>{device.name}</div>
					<div className={cn(styled.price, 'dark:text-blue-100')}>{format(Number(device.price))}</div>
					<div className={cn(styled.rate, 'dark:text-blue-100')}>
						<img src={star} alt={`Star ${device.rating}`}/>
						<div>{device.rating}</div>
					</div>
				</div>
			</Link>
	);
};

export default DeviceItem;