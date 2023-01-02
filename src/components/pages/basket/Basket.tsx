import React, {FC, useContext, useEffect, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import styled from './Basket.module.scss'
import cn from "classnames";
import {useFetchDeviceBasket} from "../../../hooks/API/useFetchDeviceBasket";
import {Context} from "../../../main";
import BasketDeviceItem from "../../ui/basket-device-list/basket-device-item/BasketDeviceItem";
import {IBasketDevice} from "../../../types/propsTypes";
import {useDeleteDeviceBasket} from "../../../hooks/API/useDeleteDeviceBasket";
import {format} from "../../../utils/formatter";
import Button from "../../ui/button/Button";
import {useMessageContext} from "../../../hooks/useMessageContext";
import {DANGER} from "../../../utils/consts";


const Basket: FC = () => {
	const [totalPrice, setTotalPrice] = useState(0)
	const [basketDevice, setBasketDevice] = useState([])
	const {user, basket} = useContext(Context)


	const {fetchDeviceBasket} = useFetchDeviceBasket()
	const {deleteDeviceBasket, loadingDelete, errorDelete} = useDeleteDeviceBasket()
	const {showMessage} = useMessageContext()


	useEffect(() => {
		fetchDeviceBasket(user.user.objectId).then(device => setBasketDevice(device))
	}, [])

	useEffect(() => {

	}, [basket.quantityDevices])

	useEffect(() => {
		if (basketDevice.length !== 0) {
			setTotalPrice(basketDevice.map((device: IBasketDevice) => device.price).reduce((p, c) => p + c))
		} else {
			setTotalPrice(0)
		}
	}, [basketDevice]);

	const deleteBasketDevice = (objectId: string, deviceId: string, deviceName: string) => {
		deleteDeviceBasket(objectId, deviceId, user.user.objectId).then(res => {
			fetchDeviceBasket(user.user.objectId).then(device => setBasketDevice(device))
			showMessage({text: `Товар ${deviceName} удален из Вашей корзины`, typeIcon: DANGER})
		})
	}

	if (errorDelete) {
		showMessage({text: errorDelete.message, typeIcon: DANGER})
	}

	return (
			<Layout>
				<div className={styled.wrapper}>
					{!!basketDevice.length ? <>
								<div className={styled.row}>
									{basketDevice.map((device: IBasketDevice) =>
											<BasketDeviceItem handlerDelete={deleteBasketDevice} loading={loadingDelete} device={device}
											                  key={device.objectId}/>)}
								</div>
								<div className={styled.footer}>
									<Button>Оформить заказ</Button>
									<div className={cn(styled.price, 'dark:text-gray-100')}>Итого к оплате: {format(totalPrice)}</div>
								</div>
							</>
							: <div className={cn(styled.absence, 'dark:text-gray-100')}>У Вас пока нет товаров в корзине...</div>
					}
				</div>
			</Layout>
	);
};

export default Basket;