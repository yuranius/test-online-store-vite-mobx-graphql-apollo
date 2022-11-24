import {useLazyQuery} from "@apollo/client";
import {
	FETCH_DEVICES,
	FETCH_DEVICES_WHEN_BRAND,
	FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE
} from "../../query/deviceAPI";
import {useState} from "react";
import {FetchDevice, IData, IDevice, INodeDevice} from "../../types/queryTypes";


export const useGetDevices = () => {

	const [getAllDevices, {loading: loadingAll}] = useLazyQuery(FETCH_DEVICES);
	const [getDevicesType, {loading: loadingType}] = useLazyQuery(FETCH_DEVICES_WHEN_TYPE)
	const [getDevicesBrand, {loading: loadingBrand}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND)
	const [getDevicesBrandAndType, {loading: loadingBrandAndType}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND_AND_TYPE)

	const [devices , setDevices] = useState([])
	const [count, setCount] = useState(0)

	let loading = loadingAll || loadingType || loadingBrand || loadingBrandAndType


	const sendData = (res:IData) => {
		setCount(res.data?.devices.count)
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


	function fetchDevice ({limit, skip, typeId, brandId}:FetchDevice) {
		switch (true) {
			case (!!typeId && !brandId):
				getDevicesType({
					variables: {
						skip: skip,
						limit: limit,
						typeId: typeId,
					}
				}).then(res => sendData(res))
				break

			case (!!brandId && !typeId):
				getDevicesBrand({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
					}
				}).then(res => sendData(res))
				break

			case (!!typeId && !!brandId):
				getDevicesBrandAndType({
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
				getAllDevices({
					variables: {
						skip: skip,
						limit: limit,
					}
				}).then(res => sendData(res))
				break
		}
	}


	return {fetchDevice, devices, count, loading};

}