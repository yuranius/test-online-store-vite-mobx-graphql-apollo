import React, {FC} from 'react';
import styled from './DeviceItem.module.scss'
import star from './../../../image/bigstar.png'
import { format } from '../../../utils/formatter';
import {Link} from "react-router-dom";
import {IDevices} from "../../../types/queryTypes";

const DeviceItem:FC<{device: IDevices}> = ({device}) => {
	return (
			<Link to={'./device/'+ device.id}  className={styled.item}>
				<div className={styled.image}>
					<img src={device.img} alt={device.name}/>
				</div>

				<div className={styled.description}>
					<div className={styled.heading}>{device.name}</div>
					<div className={styled.price}>{format(Number(device.price))}</div>
					<div className={styled.rate}>
						<img src={star} alt={`Star ${device.rating}`}/>
						<div>{device.rating}</div>
					</div>
				</div>
			</Link>
	);
};

export default DeviceItem;