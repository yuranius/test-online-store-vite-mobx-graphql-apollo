import {useLazyQuery} from "@apollo/client";
import {CHECK_RATE_USER} from "../../query/ratingAPI";
import {INodeRatingDevice} from "../../types/queryTypes";

export const useCheckRatingUserDevice = () => {
	const [checkRating, {loading, error}] = useLazyQuery(CHECK_RATE_USER)

	const checkRatingUserDevice = async ({id, user}: { id: string | undefined, user: string }) => {
		let {data} = await checkRating({
			variables: {
				userId: user,
				deviceId: id,
			},
			fetchPolicy:'cache-and-network'
		})

		if (data.ratings.count) {
			return data?.ratings.edges.map(({node}: INodeRatingDevice) => ({id: node.objectId, rate: node.rate}))
		} else {
			return [{id: '', rate: 0}]
		}
	}

	return {checkRatingUserDevice, loading, error}
}