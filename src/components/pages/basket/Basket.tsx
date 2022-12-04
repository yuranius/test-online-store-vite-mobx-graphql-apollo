import React, {FC, useContext, useEffect, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import styled from './Basket.module.scss'
import cn from "classnames";
import {useFetchDeviceBasket} from "../../../hooks/API/useFetchDeviceBasket";
import {Context} from "../../../main";
import BasketDeviceItem from "../../ui/basket-device-list/basket-device-item/BasketDeviceItem";
import {IBasketDevice} from "../../../types/propsTypes";
import {useDeleteDeviceBasket} from "../../../hooks/API/useDeleteDeviceBasket";
import {useGetCacheDeviceBasket} from "../../../hooks/API/useGetCacheDeviceBasket";


const Basket: FC = () => {
	const [totalPrice, setTotalPrice] = useState(0)
	const {user, basket} = useContext(Context)
	//const {fetchDeviceBasket} = useFetchDeviceBasket()
	//const {deleteDeviceBasket} = useDeleteDeviceBasket()
	
	//const {getDeviceCache, basketDevice} = useGetCacheDeviceBasket()


	useEffect ( () => {
		//if (basket.quantityDevices )
	    //getDeviceCache()
	},[basket])

	// useEffect(() => {
	// 	if (basketDevice.length !== 0) {
	// 		setTotalPrice(basketDevice.map((device: IBasketDevice) => device.price).reduce((p, c) => p + c))
	// 	} else {
	// 		setTotalPrice(0)
	// 	}
	// }, [basketDevice]);
	//
	// console.log( '📌:',basketDevice,basket.quantityDevices,'🌴 🏁')
	//
	//
	//
	// const deleteBasketDevice = (objectId: string, deviceId: string) => {
	// 	deleteDeviceBasket(objectId, deviceId, user.user.objectId).then(res =>
	// 			fetchDeviceBasket(user.user.objectId)
	// 	)
	// }

	
	
	//console.log( '📌:',basketDevice,'🌴 🏁')
	

	

	return (
			<Layout>
				<div className={cn(styled.wrapper)}>
					{/*{basketDevice.map((device: IBasketDevice) => <BasketDeviceItem handlerDelete={deleteBasketDevice}*/}
					{/*                                                               device={device} key={device.objectId}*/}
					{/*                                                               totalPrice={totalPrice}/>)}*/}
					<button>Оформить заказ</button>
					{basket.quantityDevices}
				</div>
			</Layout>
	);
};

export default Basket;