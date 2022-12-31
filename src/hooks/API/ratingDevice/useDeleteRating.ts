import {useMutation} from "@apollo/client";
import {CHECK_RATE_USER, DELETE_RATE} from "../../../query/ratingAPI";

export function useDeleteRating () {
	const [del, {error: errorDelete}] = useMutation(DELETE_RATE)

	const deleteRating = async ({rateId, user, value, id}:{id: string | undefined, rateId: string, user: string | null, value: number | null}) => {


		const {data} = await del({
			variables: {id: rateId},
			update(cache){
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
										__typename:"RatingConnection",
										edges: [],
										count: 0
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

	return {deleteRating}
}