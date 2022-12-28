import {useLazyQuery} from "@apollo/client";
import {GET_DEVICE} from "../../query/deviceAPI";
import {useState} from "react";
import {IDevice} from "../../types/queryTypes";
import {GetDevice} from "../../types/hooksTypes";




export const useGetDevice = () => {

	const [data] = useLazyQuery(GET_DEVICE)

	const [device, setDevice] = useState<IDevice>()

	const getDevice = ({id}:GetDevice) => {
		data({
			variables: {
				id
			},
			fetchPolicy:'cache-first'
		}).then(({data}) => {
			setDevice({
				id: data.device.objectId,
				info: data.device_infos.edges || [],
				img: data.device.img,
				name: data.device.name,
				price: data.device.price,
				rating: data.device.rating,
				brandId: data.device.brandId.objectId,
				typeId: data.device.typeId.objectId,
			})
		})
	}

	return {getDevice, device}

}