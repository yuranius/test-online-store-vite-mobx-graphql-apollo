import {useLazyQuery} from "@apollo/client";
import {GET_DEVICE_BASKET} from "../../query/basketAPI";
import {useContext, useState} from "react";
import {INodeDeviceBasket} from "../../types/queryTypes";
import {Context} from "../../main";


export const useFetchDeviceBasket = () => {
	const [getDevice] = useLazyQuery(GET_DEVICE_BASKET)
	const [basketDevice, setBasketDevice] = useState([])

	const {basket} = useContext(Context)

	const fetchDeviceBasket = async (userId: string) => {
		await getDevice({
					variables: {
						userId: userId
					},
				}
		).then(device => {
					setBasketDevice(device.data.basket_Devices.edges.map(({node}: INodeDeviceBasket) => ({
						objectId: node.objectId,
						deviceId: node.deviceId.objectId,
						img: node.deviceId.img,
						price: node.deviceId.price,
						name: node.deviceId.name
					})))
					basket.setQuantityDevices(device.data.basket_Devices.edges.length)
				}
		)
	}

	//надо ретрнить device а не передавать из State

	return {fetchDeviceBasket, basketDevice}
}