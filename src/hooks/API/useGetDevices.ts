import {useLazyQuery} from "@apollo/client";
import {
	FETCH_DEVICES,
	FETCH_DEVICES_WHEN_BRAND,
	FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE
} from "../../query/deviceAPI";
import {useContext, useState} from "react";
import {FetchDevice, IDevice, INodeDevice} from "../../types/queryTypes";
import {Context} from "../../main";


export const useGetDevices = () => {

	const [getAllDevices] = useLazyQuery(FETCH_DEVICES);
	const [getDevicesType] = useLazyQuery(FETCH_DEVICES_WHEN_TYPE)
	const [getDevicesBrand] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND)
	const [getDevicesBrandAndType] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND_AND_TYPE)


	const [loading, setLoading] = useState(false)

	const { selected } = useContext(Context)

	async function fetchDevice ({limit, skip, typeId, brandId}:FetchDevice) {
		setLoading(true)
		let devices;
		switch (true) {
			case (!!typeId && !brandId):
				devices = await getDevicesType({
					variables: {
						skip: skip,
						limit: limit,
						typeId: typeId,
					}
				})
				break

			case (!!brandId && !typeId):
				devices = await getDevicesBrand({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
					}
				})
				break

			case (!!typeId && !!brandId):
				devices = await getDevicesBrandAndType({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
						typeId: typeId,
					}
				})
				break

			default:
			case (!typeId && !brandId):
				devices = await getAllDevices({
					variables: {
						skip: skip,
						limit: limit,
					}
				})
				break
		}

		selected.setCount(devices.data?.devices.count)

		setLoading(false)

		return {
			devices: devices.data?.devices.edges.map(({node}: INodeDevice): IDevice => ({
				id: node.objectId,
				name: node.name,
				brandId: node.brandId.objectId,
				typeId: node.typeId.objectId,
				img: node.img,
				rating: node.rating,
				price: node.price,
			})), count: devices.data?.devices.count
		}
	}


	return {fetchDevice, loading};

}