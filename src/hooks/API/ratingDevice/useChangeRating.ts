import {CHANGE_RATE, CHECK_RATE_USER} from "../../../query/ratingAPI";
import {useMutation} from "@apollo/client";

export function useChangeRating () {

	const [change, {error: errorChange}] = useMutation(CHANGE_RATE)

	const changeRating = async ({rateId, id, user, value}: {rateId: string, id: string | undefined, user: string | null, value: number | null}) => {

		let {data} = await change({
			variables: {
				id: rateId,
				rate: value
			},
			update(cache, {data: {updateRating}}) {
				const data: any = cache.readQuery({
					query: CHECK_RATE_USER,
					variables: {
						deviceId: id,
						userId: user,
						rate: value,
					}
				})
				cache.modify({
					fields: {
						ratings() {
							cache.writeQuery({
								query: CHECK_RATE_USER,
								variables: {
									deviceId: id,
									userId: user,
									rate: value,
								},
								data: {
									ratings: {
										...data.ratings, edges: [{...data.ratings.edges[0], node: updateRating.rating}]
									}
								}
							})
						}
					}
				})
			}
		})
		return data
	}

	return { changeRating, errorChange }

}