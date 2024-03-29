import {useLazyQuery} from '@apollo/client'
import {useContext} from 'react'

import {Context} from '../../main'
import {GET_DEVICE_BASKET} from '../../query/basketAPI'
import {INodeDeviceBasket} from '../../types/queryTypes'

export const useFetchDeviceBasket = () => {
	const [getDevice] = useLazyQuery(GET_DEVICE_BASKET)

	const {basket} = useContext(Context)

	const fetchDeviceBasket = async (userId: string) => {
		return await getDevice({
			variables: {
				userId: userId,
			},
		}).then((device) => {
			basket.setQuantityDevices(device.data.basket_Devices.edges.length)
			return device.data.basket_Devices.edges.map(
					({node}: INodeDeviceBasket) => ({
						objectId: node.objectId,
						deviceId: node.deviceId.objectId,
						img: node.deviceId.img,
						price: node.deviceId.price,
						name: node.deviceId.name,
					}),
			)
		})
	}

	return {fetchDeviceBasket}
}
