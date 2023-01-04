import {DocumentNode, useLazyQuery, useMutation} from "@apollo/client";
import {
	DELETE_DEVICE,
	DELETE_DEVICE_INFO,
	FETCH_DEVICES, FETCH_DEVICES_WHEN_BRAND, FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE,
	GET_DEVICE_INFO
} from "../../query/deviceAPI";
import {DELETE_RATE, GET_RATING_DEVICE} from "../../query/ratingAPI";
import {useContext, useState} from "react";
import {Context} from "../../main";
import {INodeTypeBrand} from "../../types/queryTypes";


export const useDeleteDevice = () => {

	const [loading, setLoading] = useState(false)

	const [deleteDevice] = useMutation(DELETE_DEVICE)
	const [deleteInfo] = useMutation(DELETE_DEVICE_INFO)
	const [deleteRate] = useMutation(DELETE_RATE)

	const [getInfo] = useLazyQuery(GET_DEVICE_INFO)
	const [getRate] = useLazyQuery(GET_RATING_DEVICE)


	const { user, selected } = useContext(Context)
	let skip = user.currentPage * selected.limit - selected.limit
	const [, {refetch}] = useLazyQuery(FETCH_DEVICES, {
		variables: {
			skip: skip,
			limit: selected.limit,
		}
	});


	const destroyDevice = async (id: string | undefined) => {
		setLoading(true)
		const {data} = await deleteDevice({
			variables: {
				id: id
			},
			// update(cache, {data}) {
			// 	let deviceAPI: DocumentNode;
			// 	let variablesDeviceIP = {}
			//
			// 	if (!selected.selectedBrand.id && !!selected.selectedType.id) {
			// 		deviceAPI = FETCH_DEVICES_WHEN_TYPE
			// 		variablesDeviceIP = {
			// 			skip: skip,
			// 			limit: selected.limit,
			// 			typeId: selected.selectedType.id
			// 		}
			// 	} else if (!!selected.selectedBrand.id && !selected.selectedType.id) {
			// 		deviceAPI = FETCH_DEVICES_WHEN_BRAND
			// 		variablesDeviceIP = {
			// 			skip: skip,
			// 			limit: selected.limit,
			// 			brandId: selected.selectedBrand.id
			// 		}
			// 	} else if (!!selected.selectedBrand.id && !!selected.selectedType.id) {
			// 		deviceAPI = FETCH_DEVICES_WHEN_BRAND_AND_TYPE
			// 		variablesDeviceIP = {
			// 			skip: skip,
			// 			limit: selected.limit,
			// 			brandId: selected.selectedBrand.id,
			// 			typeId: selected.selectedType.id
			// 		}
			// 	} else {
			// 		deviceAPI = FETCH_DEVICES
			// 		variablesDeviceIP = {
			// 			skip: skip,
			// 			limit: selected.limit,
			// 		}
			// 	}

				// let {devices}: any = cache.readQuery({
				// 	query: deviceAPI,
				// 	variables: variablesDeviceIP
				// })
				//
				// cache.writeQuery({
				// 	query: deviceAPI,
				// 	variables: variablesDeviceIP,
				// 	data: {
				// 		devices: {
				// 			...devices, ...{
				// 				edges: [
				// 					...devices.edges.filter(({node}: any) => node.objectId !== id)
				// 				],
				// 				count: devices.count - 1
				// 			}
				// 		}
				// 	}
				// })
			//}
		})

		const {data: deviceInfos}= await getInfo({
			variables: {id}
		})
		const {data: ratings} = await getRate({
			variables:{deviceId: id}
		})

		let arrInfoDevice = deviceInfos.device_infos.edges.map(({node}: INodeTypeBrand) => ({id: node.objectId}))
		let arrRateDevice = ratings.ratings.edges.map(({node}: INodeTypeBrand) => ({id: node.objectId}))

		if (arrInfoDevice.length){
			await arrInfoDevice.map(({id}: { id: string }) => {
				deleteInfo({
					variables: {id}
				})
			})
		}

		if (arrRateDevice.length){
			await arrRateDevice.map(({id}: { id: string }) => {
				deleteRate({
					variables: {id}
				})
			})
		}

		await refetch()
		setLoading(false)
		return data
	}


	return {destroyDevice, loading}
}