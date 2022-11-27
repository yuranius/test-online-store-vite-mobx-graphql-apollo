import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_DEVICE_BASKET, CHECK_DEVICE_BASKET, GET_DEVICE_BASKET} from "../../query/basketAPI";


export const useAddDeviceBasket = () => {

	const [add, {loading: loadingAdd, error: errorAdd}] = useMutation(ADD_DEVICE_BASKET)
	const [check, {loading: loadingCheck, error: errorCheck}] = useLazyQuery(CHECK_DEVICE_BASKET)

	let addDeviceBasket = async (deviceId: string, userId: string) => {
		let checkBasket = await check({
			variables: {
				userId: userId,
				deviceId: deviceId
			}
		}).then(res => res.data.basket_Devices.edges.length)

		if (!checkBasket) {
			return await add({
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
			).then(res => 0)
		}

		return checkBasket
	}

	let loading = loadingCheck || loadingAdd
	let error = errorCheck || errorAdd

	return {addDeviceBasket, loading, error}
}