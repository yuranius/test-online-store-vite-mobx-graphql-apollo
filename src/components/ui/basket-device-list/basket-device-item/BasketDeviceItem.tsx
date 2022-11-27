import {FC} from 'react';
import {IBasketDeviceItem} from "../../../../types/propsTypes";
import styled from './BasketDeviceItem.module.scss'
import Button from "../../button/Button";

const BasketDeviceItem:FC<IBasketDeviceItem> = ({device,totalPrice, handlerDelete}) => {

	return (
			<div className={styled.wrapper}>
				<div>{device.name}</div>
				<Button onClick={() => handlerDelete(device.objectId, device.deviceId)}>Test</Button>
			</div>
	);
};

export default BasketDeviceItem;