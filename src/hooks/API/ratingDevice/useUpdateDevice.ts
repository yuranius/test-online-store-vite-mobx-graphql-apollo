import {GET_DEVICE} from "../../../query/deviceAPI";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_RATING_DEVICE, UPDATE_DEVICE} from "../../../query/ratingAPI";


export function useUpdateDevice () {

	const [update, {error: errorUpdate}] = useMutation(UPDATE_DEVICE)
	const [getRatingDevice, {error: errorGetRatingDevice}] = useLazyQuery(GET_RATING_DEVICE)

	const updateDevice = async ({ id,rateId,value }:{id: string | undefined, rateId?: string | null, value?: number | null }) => {

		let {data: dataGetRating} = await getRatingDevice({
			variables: {deviceId: id},
			fetchPolicy: 'cache-first'
		})

		const quantity = dataGetRating.ratings.count
		const sumRate = dataGetRating.ratings.edges.map(({node}: { node: { rate: number } }) => node.rate).reduce((sum: number, a: number) => sum + a, 0)

		let {data: totalRate} = await update({
			variables: {
				deviceId: id,
				rate: sumRate / quantity
			},
			// * ---------- UPDATE CACHE -----------------------
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
				// let {ratings}: any = cache.readQuery({
				// 	query: GET_RATING_DEVICE,
				// 	variables: {deviceId: id}
				// })
				// const newRate = ratings.edges.filter(({node}: any) => node.objectId === rateId)
				// cache.writeQuery({
				// 	query: GET_RATING_DEVICE,
				// 	variables: {deviceId: id},
				// 	data: {
				// 		ratings: {
				// 			...ratings, ...{
				// 				edges: [
				// 					...ratings.edges.filter(({node}: any) => node.objectId !== rateId),
				// 					{...newRate[0], node: {...newRate[0].node, rate: value}}
				// 				]
				// 			}
				// 		}
				// 	}
				// })
			}
			// * ---------- UPDATE CACHE -----------------------
		})

	}


	return {updateDevice, errorUpdate, errorGetRatingDevice}

}