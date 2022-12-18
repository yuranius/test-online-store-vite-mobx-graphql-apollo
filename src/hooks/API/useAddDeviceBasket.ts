import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_DEVICE_BASKET, CHECK_DEVICE_BASKET, GET_DEVICE_BASKET} from "../../query/basketAPI";
import {useState} from "react";


export const useAddDeviceBasket = () => {

	const [add, {error: errorAdd}] = useMutation(ADD_DEVICE_BASKET)
	const [check, {error: errorCheck}] = useLazyQuery(CHECK_DEVICE_BASKET)

	const [loading, setLoading] = useState(false)

	let addDeviceBasket = async (deviceId: string, userId: string) => {

		setLoading(true)

		let {data} = await check({
			variables: {
				userId: userId,
				deviceId: deviceId
			}
		})

		if (!data.basket_Devices.edges.length) {
			await add({
						variables: {
							userId: userId,
							deviceId: deviceId
						},
						update(cache, {data: {createBasket_Device}}) {
							let {basket_Devices}: any = cache.readQuery({
								query: GET_DEVICE_BASKET, variables: {
									userId: userId
								}
							})
							let {basket_Devices: check}: any = cache.readQuery({
								query: CHECK_DEVICE_BASKET, variables: {
									userId: userId,
									deviceId: deviceId
								}
							})

							cache.writeQuery({
								query: GET_DEVICE_BASKET,
								variables: {
									userId: userId
								},
								data: {
									basket_Devices: {
										...basket_Devices, ...{
											edges: [...basket_Devices.edges, {
												__typename: "Basket_DeviceEdge",
												node: createBasket_Device.basket_Device
											}]
										}
									}
								}
							})

							cache.writeQuery({
								query: CHECK_DEVICE_BASKET,
								variables: {
									userId: userId,
									deviceId: deviceId
								},
								data: {
									basket_Devices: {
										...check, ...{
											edges: [...check.edges, {
												__typename: "Basket_DeviceEdge",
												node: createBasket_Device.basket_Device
											}]
										}
									}
								}
							})

						}
					}
			)
			setLoading(false)
			return 0
		} else {
			setLoading(false)
			return data.basket_Devices.edges.length
		}
	}

	let error = errorCheck || errorAdd

	return {addDeviceBasket, loading, error}
}