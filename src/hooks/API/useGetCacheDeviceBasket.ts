import {useContext, useState} from "react";
import {useApolloClient} from "@apollo/client";
import {GET_DEVICE_BASKET} from "../../query/basketAPI";
import {INodeDeviceBasket} from "../../types/queryTypes";
import {Context} from "../../main";


export const useGetCacheDeviceBasket = () => {
	const [basketDevice, setBasketDevice] = useState([])
	const {cache}: any = useApolloClient()
	const {user} = useContext(Context)

	let deviceCache = cache.readQuery({
		query: GET_DEVICE_BASKET, variables: {
			userId: user.user.objectId
		}
	})


	if (deviceCache.basket_Devices){
		setBasketDevice(deviceCache?.basket_Devices.edges.map(({node}: INodeDeviceBasket) => ({
			objectId: node.objectId,
			deviceId: node.deviceId.objectId,
			img: node.deviceId.img,
			price: node.deviceId.price,
			name: node.deviceId.name
		})))
	}



	console.log('📌:', basketDevice, '🌴 🏁')


	return {basketDevice,deviceCache}

}