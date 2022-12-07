import React, {FC} from 'react';
import {IBasketDeviceItem} from "../../../../types/propsTypes";
import styled from './BasketDeviceItem.module.scss'
import Button from "../../button/Button";
import cn from "classnames";
import {format} from "../../../../utils/formatter";

const BasketDeviceItem:FC<IBasketDeviceItem> = ({device, loading, handlerDelete}) => {

	return (
			<div className={cn(styled.wrapper, 'dark:bg-slate-600' )}>
				<div className='flex gap-2'>
					<div className={styled.image}><img src={device.img} alt=""/></div>
					<div className={cn(styled.title, 'dark:text-gray-100 text-gray-700')}>{device.name}</div>
				</div>
				<div className={cn(styled.ended, loading && styled.loading) }>
					<div className={cn(styled.price, 'dark:text-gray-100')}>{format(device.price)}</div>
					<Button onClick={() => handlerDelete(device.objectId, device.deviceId, device.name)} disabled={loading} >
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						     xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
						</svg>
					</Button>
				</div>
			</div>
	);
};

export default BasketDeviceItem;