import {useMutation} from "@apollo/client";
import {CHECK_DEVICE_BASKET, DELETE_DEVICE_BASKET, GET_DEVICE_BASKET} from "../../query/basketAPI";
import {INodeDeviceBasket} from "../../types/queryTypes";

export const useDeleteDeviceBasket = () => {
	const [deleteDevice, {loading: loadingDelete, error: errorDelete}] = useMutation(DELETE_DEVICE_BASKET)

	const deleteDeviceBasket = async (objectId: string, deviceId: string, userId: string) => {
		return await deleteDevice({
			variables: {id: objectId},
			update(cache, {data}) {
				let {basket_Devices}: any = cache.readQuery({
					query: GET_DEVICE_BASKET, variables: {
						userId: userId
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
								edges: basket_Devices.edges.filter((device: INodeDeviceBasket) => device.node.deviceId.objectId !== deviceId)
							}
						}
					}
				})

				let {basket_Devices: check}: any = cache.readQuery({
					query: CHECK_DEVICE_BASKET,
					variables: {
						userId: userId,
						deviceId: deviceId
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
								edges: []
							}
						}
					}
				})
			}
		})
	}
	return {deleteDeviceBasket, loadingDelete, errorDelete}
}