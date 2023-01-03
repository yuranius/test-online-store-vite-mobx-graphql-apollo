import {useLazyQuery} from "@apollo/client";
import {
	FETCH_DEVICES,
	FETCH_DEVICES_WHEN_BRAND,
	FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE
} from "../../query/deviceAPI";
import {useContext, useState} from "react";
import {FetchDevice, IData, IDevice, INodeDevice} from "../../types/queryTypes";
import {Context} from "../../main";


export const useGetDevices = () => {

	const [getAllDevices, {loading: loadingAll}] = useLazyQuery(FETCH_DEVICES);
	const [getDevicesType, {loading: loadingType}] = useLazyQuery(FETCH_DEVICES_WHEN_TYPE)
	const [getDevicesBrand, {loading: loadingBrand}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND)
	const [getDevicesBrandAndType, {loading: loadingBrandAndType}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND_AND_TYPE)

	const [devices , setDevices] = useState([])
	const [count, setCount] = useState(0)
	const [loading, setLoading] = useState(false)

	const { selected } = useContext(Context)

	//let loading = loadingAll || loadingType || loadingBrand || loadingBrandAndType


	const sendData = (res:IData) => {
		setCount(res.data?.devices.count)
		selected.setCount(res.data?.devices.count)
		setDevices(res.data?.devices.edges.map(({node}: INodeDevice): IDevice => ({
			id: node.objectId,
			name: node.name,
			brandId: node.brandId.objectId,
			typeId: node.typeId.objectId,
			img: node.img,
			rating: node.rating,
			price: node.price,
		})))
	}


	async function fetchDevice ({limit, skip, typeId, brandId}:FetchDevice) {
		setLoading(true)
		switch (true) {
			case (!!typeId && !brandId):
				await getDevicesType({
					variables: {
						skip: skip,
						limit: limit,
						typeId: typeId,
					}
				}).then( res => sendData(res))
				break

			case (!!brandId && !typeId):
				await getDevicesBrand({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
					}
				}).then(res => sendData(res))
				break

			case (!!typeId && !!brandId):
				await getDevicesBrandAndType({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
						typeId: typeId,
					}
				}).then(res => sendData(res))
				break

			default:
			case (!typeId && !brandId):
				await getAllDevices({
					variables: {
						skip: skip,
						limit: limit,
					}
				}).then(res => sendData(res))
				break
		}

		console.log(devices)
		setLoading(false)
		return devices
	}


	return {fetchDevice, devices, count, loading};

}