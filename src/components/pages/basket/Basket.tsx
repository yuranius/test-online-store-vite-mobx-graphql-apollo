import React, {FC, useContext, useEffect, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import styled from './Basket.module.scss'
import cn from "classnames";
import {useFetchDeviceBasket} from "../../../hooks/API/useFetchDeviceBasket";
import {Context} from "../../../main";
import BasketDeviceItem from "../../ui/basket-device-list/basket-device-item/BasketDeviceItem";
import {IBasketDevice} from "../../../types/propsTypes";
import {useDeleteDeviceBasket} from "../../../hooks/API/useDeleteDeviceBasket";
import {observer} from "mobx-react-lite";
import {useApolloClient} from "@apollo/client";
import {GET_DEVICE_BASKET} from "../../../query/basketAPI";

const Basket: FC = observer(() => {
	const [totalPrice, setTotalPrice] = useState(0)
	const {user} = useContext(Context)
	const {fetchDeviceBasket, basketDevice, deviceCache, refetch} = useFetchDeviceBasket()
	//const {basketDevice} = useGetCacheDeviceBasket()
	const {deleteDeviceBasket} = useDeleteDeviceBasket()

	const {cache}: any = useApolloClient()

	// let deviceCache:any = cache.readQuery({
	// 	query: GET_DEVICE_BASKET, variables: {
	// 		userId: user.user.objectId
	// 	}
	// })



	useEffect(() => {
		if (user.user.objectId && !basketDevice.length) {
			refetch(user.user.objectId).then(res => getDeviceBasket(user.user.objectId))
		}
	}, [user.user, basketDevice])


	useEffect(() => {
		if (basketDevice.length !== 0) {
			setTotalPrice(basketDevice.map((device: IBasketDevice) => device.price).reduce((p, c) => p + c))
		} else {
			setTotalPrice(0)
		}
	}, [basketDevice]);


	const deleteBasketDevice = (objectId: string, deviceId: string) => {
		deleteDeviceBasket(objectId, deviceId, user.user.objectId).then(res =>
				fetchDeviceBasket(user.user.objectId)
		)
	}




	return (
			<Layout>
				<div className={cn(styled.wrapper)}>
					{basketDevice.map((device: IBasketDevice) => <BasketDeviceItem handlerDelete={deleteBasketDevice}
					                                                               device={device} key={device.objectId}
					                                                               totalPrice={totalPrice}/>)}
					<button>Оформить заказ</button>
				</div>
			</Layout>
	);
})

export default Basket;