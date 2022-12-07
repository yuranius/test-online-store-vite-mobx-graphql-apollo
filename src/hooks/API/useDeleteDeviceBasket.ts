import {useApolloClient, useMutation} from "@apollo/client";
import {DELETE_DEVICE_BASKET, GET_DEVICE_BASKET} from "../../query/basketAPI";
import {INodeDeviceBasket} from "../../types/queryTypes";

export const useDeleteDeviceBasket = () => {
	const [deleteDevice, {loading: loadingDelete, error: errorDelete}] = useMutation(DELETE_DEVICE_BASKET)

	const deleteDeviceBasket = async (objectId: string, deviceId: string, userId: string) => {
		await deleteDevice({
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
			}
		}).then(res => res)
	}



	return {deleteDeviceBasket, loadingDelete, errorDelete}
}