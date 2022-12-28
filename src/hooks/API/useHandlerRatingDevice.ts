import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_RATE, CHANGE_RATE, CHECK_RATE_USER, GET_RATING_DEVICE, UPDATE_DEVICE} from "../../query/ratingAPI";
import {IAddRatingDevice} from "../../types/hooksTypes";
import {GET_DEVICE} from "../../query/deviceAPI";
import {useState} from "react";

export const useHandlerRatingDevice = () => {

	const [addRating, {error: errorAdd}] = useMutation(ADD_RATE)
	const [checkRateDiveceUser, {error: errorCheck}] = useLazyQuery(CHECK_RATE_USER)
	const [changeRating, {error: errorChange}] = useMutation(CHANGE_RATE)
	const [getRatingDevice, {error: errorGet}] = useLazyQuery(GET_RATING_DEVICE)
	const [updateDevice, {error: errorUpdate}] = useMutation(UPDATE_DEVICE)

	const [loading, setLoading] = useState(false)

	const addRatingDevice = async ({value, user, id, rateId}: IAddRatingDevice) => {
		setLoading(true)
		let {data} = await checkRateDiveceUser({
			variables: {
				userId: user,
				deviceId: id
			},
			fetchPolicy: 'cache-first'
		})
		if (data.ratings.count < 1) {
			let {data} = await addRating({
				variables: {
					deviceId: id,
					userId: user,
					rate: value,
				},
				update(cache, {data: {createRating}}) {
					// * ---------- UPDATE CACHE -----------------------
					const {ratings}: any = cache.readQuery({
						query: CHECK_RATE_USER,
						variables: {
							deviceId: id,
							userId: user,
							rate: value,
						}
					})
					cache.writeQuery({
						query: CHECK_RATE_USER,
						data: {
							ratings: {
								...ratings, ...{edges: [...ratings.edges, {node: createRating.rating}]}
							}
						}
					})
					// * ---------- UPDATE CACHE -----------------------
				}
			})

			// @ ------- Update total rate this device -------------
			let {data: dataGetRating} = await getRatingDevice({
				variables: {deviceId: id},
				fetchPolicy: 'cache-first'
			})

			const quantity = dataGetRating.ratings.count
			const sumRate = dataGetRating.ratings.edges.map(({node}: { node: { rate: number } }) => node.rate).reduce((sum: number, a: number) => sum + a, 0)

			let {data: totalRate} = await updateDevice({
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
					cache.writeQuery({
						query: GET_DEVICE,
						data: {
							device: {...device, rating: updateDevice.device.rating},
							device_infos: {...device_infos}
						}
					})
				}
				// * ---------- UPDATE CACHE -----------------------
			})
			// @ ------- Update total rate this device -------------

			setLoading(false)

			return {
				id: data.createRating.rating.objectId,
				rate: data.createRating.rating.rate
			}

		} else {
			let {data} = await changeRating({
				variables: {
					id: rateId,
					rate: value
				},
				// * ---------- UPDATE CACHE -----------------------
				update(cache, {data: {updateRating}}) {
					const {ratings}: any = cache.readQuery({
						query: CHECK_RATE_USER,
						variables: {
							deviceId: id,
							userId: user,
							rate: value,
						}
					})
					cache.writeQuery({
						query: CHECK_RATE_USER,
						data: {
							ratings: {
								...ratings, ...{edges: [{node: updateRating.rating}]}
							}
						}
					})
				}
				// * ---------- UPDATE CACHE -----------------------
			})

			// @ ------- Update total rate this device -------------
			let {data: dataGetRating} = await getRatingDevice({
				variables: {deviceId: id},
				fetchPolicy: 'cache-first'
			})

			const quantity = dataGetRating.ratings.count
			const sumRate = dataGetRating.ratings.edges.map(({node}: { node: { rate: number } }) => node.rate).reduce((sum: number, a: number) => sum + a, 0)

			let {data: totalRate} = await updateDevice({
				variables: {
					deviceId: id,
					rate: sumRate / quantity
				},
				// * ---------- UPDATE CACHE -----------------------
				update(cache, {data: {updateDevice}}) {
					// ----- update rate device page ---------------
					let {device, device_infos}: any = cache.readQuery({
						query: GET_DEVICE,
						variables: {id}
					})
					cache.writeQuery({
						query: GET_DEVICE,
						data: {
							device: {...device, rating: updateDevice.device.rating},
							device_infos: {...device_infos}
						}
					})
					// ----- update over voice rate ---------------
					let {ratings}: any = cache.readQuery({
						query: GET_RATING_DEVICE,
						variables: {deviceId: id}
					})
					const newRate = ratings.edges.filter(({node}: any) => node.objectId === rateId)
					cache.writeQuery({
						query: GET_RATING_DEVICE,
						data: {
							ratings: {
								...ratings, ...{
									edges: [
										...ratings.edges.filter(({node}: any) => node.objectId !== rateId),
										{...newRate[0], node: {...newRate[0].node, rate: value}}
									]
								}
							}
						}
					})
				}
				// * ---------- UPDATE CACHE -----------------------
			})
			// @ ------- Update total rate this device -----------

			setLoading(false)

			return {
				id: data.updateRating.rating.objectId,
				rate: data.updateRating.rating.rate
			}
		}
	}

	let error = errorAdd || errorChange || errorCheck || errorGet || errorUpdate

	return {addRatingDevice, loading, error}
}