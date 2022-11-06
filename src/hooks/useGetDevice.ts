import {useLazyQuery} from "@apollo/client";
import {
	FETCH_DEVICES,
	FETCH_DEVICES_WHEN_BRAND,
	FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE
} from "../query/deviceAPI";
import {useState} from "react";
import {IDevice} from "../types/queryTypes";


export const useGetDevices = () => {

	const [getAllDevices, {loading: loadingAll}] = useLazyQuery(FETCH_DEVICES);
	const [getDevicesType, {loading: loadingType}] = useLazyQuery(FETCH_DEVICES_WHEN_TYPE)
	const [getDevicesBrand, {loading: loadingBrand}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND)
	const [getDevicesBrandAndType, {loading: loadingBrandAndType}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND_AND_TYPE)

	const [devices , setDevices] = useState([])
	const [count, setCount] = useState(0)

	let loading = loadingAll || loadingType || loadingBrand || loadingBrandAndType

	type FetchDevice = {
		limit: number
		skip: number
		typeId?: string
		brandId?: string
	}

	type Node = {
		node:{
			objectId: string,
			name: string,
			brandId: {
				objectId: string
			},
			typeId: {
				objectId: string
			},
			img: string,
			rating: string,
			price: string,
		}
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
				}).then(res => {
					setCount(res.data.devices.count)
					setDevices(res.data.devices.edges)
				})
				break

			case (!!brandId && !typeId):
				getDevicesBrand({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
					}
				}).then(res => setDevices(res.data.devices))
				break

			case (!!typeId && !!brandId):
				getDevicesBrandAndType({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
						typeId: typeId,
					}
				}).then(res => setDevices(res.data.devices))
				break

			default:
			case (!typeId && !brandId):
				getAllDevices({
					variables: {
						skip: skip,
						limit: limit,
					}
				}).then(res => {
							setCount(res.data.devices.count)
							setDevices(res.data.devices.edges.map ( ({node}:Node):IDevice => ({
								id: node.objectId,
								name: node.name,
								brandId: node.brandId.objectId,
								typeId: node.typeId.objectId,
								img: node.img,
								rating: node.rating,
								price: node.price,
							})))
						}
				)
				break
		}
	}


	return {fetchDevice, devices, count, loading};

}