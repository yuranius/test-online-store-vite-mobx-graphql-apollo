import {useApolloClient, useLazyQuery} from "@apollo/client";
import {GET_DEVICE_BASKET} from "../../query/basketAPI";
import {useContext, useState} from "react";
import {Context} from "../../main";
import {INodeDeviceBasket} from "../../types/queryTypes";



export const useFetchDeviceBasket = () => {
	const [getDevice,{refetch}] = useLazyQuery(GET_DEVICE_BASKET)
	const [basketDevice, setBasketDevice] = useState([])
	const {cache}: any = useApolloClient()
	const {user} = useContext(Context)

	let deviceCache:any = cache.readQuery({
		query: GET_DEVICE_BASKET, variables: {
			userId: user.user.objectId
		}
	})


	const getCacheDevice = (device:any) => {
		return device?.basket_Devices.edges.map(({node}: INodeDeviceBasket) => ({
			objectId: node.objectId,
			deviceId: node.deviceId.objectId,
			img: node.deviceId.img,
			price: node.deviceId.price,
			name: node.deviceId.name
		}))
	}

	const fetchDeviceBasket = async (userId: string) => {
		await getDevice({
					variables: {
						userId: userId
					},
				}
		)

		return deviceCache?.basket_Devices.edges.map(({node}: INodeDeviceBasket) => ({
			objectId: node.objectId,
			deviceId: node.deviceId.objectId,
			img: node.deviceId.img,
			price: node.deviceId.price,
			name: node.deviceId.name
		}))
	}
	return {fetchDeviceBasket, basketDevice, deviceCache, getCacheDevice, refetch}
}