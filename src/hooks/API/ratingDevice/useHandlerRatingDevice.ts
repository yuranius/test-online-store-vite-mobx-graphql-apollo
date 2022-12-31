import {useLazyQuery, useMutation} from "@apollo/client";
import {CHECK_RATE_USER, DELETE_RATE} from "../../../query/ratingAPI";
import {IAddRatingDevice} from "../../../types/hooksTypes";
import {useState} from "react";
import {useUpdateDevice} from "./useUpdateDevice";
import {useAddRating} from "./useAddRating";
import {useChangeRating} from "./useChangeRating";
import {useDeleteRating} from "./useDeleteRating";

export const useHandlerRatingDevice = () => {


	const [checkRateDeviceUser, {error: errorCheck}] = useLazyQuery(CHECK_RATE_USER)


	const { updateDevice, errorUpdate, errorGetRatingDevice } = useUpdateDevice()
	const { addRating, errorAdd } = useAddRating()
	const { changeRating, errorChange }  = useChangeRating()
	const { deleteRating } = useDeleteRating()

	const [loading, setLoading] = useState(false)

	const addRatingDevice = async ({value, user, id, rateId}: IAddRatingDevice) => {
		setLoading(true)

		let {data} = await checkRateDeviceUser({
			variables: {
				userId: user,
				deviceId: id
			},
			fetchPolicy: 'cache-first'
		})
		if (data.ratings.count < 1) {
			const data = await addRating({id, user, value})
			await updateDevice(id)
			setLoading(false)

			return {
				id: data.createRating.rating.objectId,
				rate: data.createRating.rating.rate
			}

		} else {
			const data = await changeRating({rateId, id, user, value})
			await updateDevice(id)
			setLoading(false)

			return {
				id: data.updateRating.rating.objectId,
				rate: data.updateRating.rating.rate
			}
		}
	}

	const deleteRatingDevice = async ({value, user, id, rateId}: IAddRatingDevice ) => {
		setLoading(true)
		await deleteRating({id, user, value, rateId})
		await updateDevice(id)
		setLoading(false)
	}

	let error = errorAdd || errorChange || errorCheck || errorGetRatingDevice || errorUpdate

	return {addRatingDevice, deleteRatingDevice, loading, error}
}