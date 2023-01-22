import {
	FETCH_DEVICES,
	FETCH_DEVICES_WHEN_BRAND,
	FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE,
	GET_DEVICE
} from "../../../query/deviceAPI";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_RATING_DEVICE, UPDATE_DEVICE} from "../../../query/ratingAPI";
import {useContext} from "react";
import {Context} from "../../../main";


export function useUpdateDevice() {

	const [update, {error: errorUpdate}] = useMutation(UPDATE_DEVICE)
	const [getRatingDevice, {error: errorGetRatingDevice}] = useLazyQuery(GET_RATING_DEVICE)
	const {user, selected} = useContext(Context)

	let skip = user.currentPage * selected.limit - selected.limit

	const updateDevice = async (id: string | undefined) => {
		let {data: dataGetRating} = await getRatingDevice({
			variables: {deviceId: id},
			fetchPolicy: 'cache-first'
		})

		const quantity = dataGetRating.ratings.count
		const sumRate = dataGetRating.ratings.edges.map(({node}: { node: { rate: number } }) => node.rate).reduce((sum: number, a: number) => sum + a, 0)

		let rate = quantity ? sumRate / quantity : 0

		let {data: totalRate} = await update({
			variables: {
				deviceId: id,
				rate: rate
			},
			update(cache, {data: {updateDevice}}) {
				let {device, device_infos}: any = cache.readQuery({
					query: GET_DEVICE,
					variables: {id}
				})

				cache.modify({
					fields: {
						device() {
							cache.writeQuery({
								query: GET_DEVICE,
								variables: {id},
								data: {
									device: {...device, rating: updateDevice.device.rating},
									device_infos: {...device_infos}
								}
							})
						}
					}
				})

				let fetchDevice = new Promise((res, rej) => {
					let {devices}: any = cache.readQuery({
						query: FETCH_DEVICES,
						variables: {
							skip: skip,
							limit: selected.limit
						}
					})
					res({status: 0, devices})
				})

				let fetchDeviceType = new Promise((res, rej) => {
					let {devices}: any = cache.readQuery({
						query: FETCH_DEVICES_WHEN_TYPE,
						variables: {
							skip: skip,
							limit: selected.limit,
							typeId: selected.selectedType.id
						}
					})
					res({status: 1, devices})
				})
				let fetchDeviceBrand = new Promise((res, rej) => {
					let {devices}: any = cache.readQuery({
						query: FETCH_DEVICES_WHEN_BRAND,
						variables: {
							skip: skip,
							limit: selected.limit,
							brandId: selected.selectedBrand.id
						}
					})
					res({status: 2, devices})
				})

				let fetchDeviceBrandAndType = new Promise((res, rej) => {
					let {devices}: any = cache.readQuery({
						query: FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
						variables: {
							skip: skip,
							limit: selected.limit,
							brandId: selected.selectedBrand.id,
							typeId: selected.selectedType.id
						}
					})
					res({status: 3, devices})
				})


				Promise.allSettled([
					fetchDevice,
					fetchDeviceType,
					fetchDeviceBrand,
					fetchDeviceBrandAndType
				]).then((res: any) => res.map(({status, value}: any, index: number) => {
					let newDevice = []
					let data = {}

					if (!!res[index].value?.devices) {
						newDevice = res[index].value.devices.edges.filter(({node}: any) => node.objectId === id)
						data = {
							devices: {
								...res[index].value.devices, ...{
									edges: [
										{...newDevice[0], node: {...newDevice[0].node, rating: rate}},
										...res[index].value.devices.edges.filter(({node}: any) => node.objectId !== id)
									]
								}
							}
						}
					}

					if (status === 'fulfilled' && value?.status === 0) {
						cache.writeQuery({
									query: FETCH_DEVICES,
									variables: {
										skip: skip,
										limit: selected.limit,
									},
									data
								}
						)
					}
					if (status === 'fulfilled' && value?.status === 1) {
						cache.writeQuery({
							query: FETCH_DEVICES_WHEN_TYPE,
							variables: {
								skip: skip,
								limit: selected.limit,
								typeId: selected.selectedType.id
							},
							data
						})
					}

					if (status === 'fulfilled' && value?.status === 2) {
						cache.writeQuery({
							query: FETCH_DEVICES_WHEN_BRAND,
							variables: {
								skip: skip,
								limit: selected.limit,
								brandId: selected.selectedBrand.id
							},
							data
						})
					}

					if (status === 'fulfilled' && value?.status === 3) {
						cache.writeQuery({
							query: FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
							variables: {
								skip: skip,
								limit: selected.limit,
								typeId: selected.selectedType.id,
								brandId: selected.selectedBrand.id
							},
							data
						})
					}
				}))
			}
		})
	}


	return {updateDevice, errorUpdate, errorGetRatingDevice}

}