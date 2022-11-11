import React, {FC} from 'react';
import {IDevice} from "../../../types/queryTypes";
import styled from './DeviceItem.module.scss'
import star from './../../../image/bigstar.png'
import { format } from '../../../utils/formatter';
import {Link} from "react-router-dom";

const DeviceItem:FC<{device: IDevice}> = ({device}) => {



	return (
			<Link to={'./device/'+ device.id}  className={styled.item}>
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
			</Link>
	);
};

export default DeviceItem;