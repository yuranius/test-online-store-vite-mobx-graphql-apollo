import {ADD_RATE, CHECK_RATE_USER} from "../../../query/ratingAPI";
import {useMutation} from "@apollo/client";

export function useAddRating () {

	const [add, {error: errorAdd}] = useMutation(ADD_RATE)

	const addRating = async ({id, user, value}: {id:string | undefined, user: string, value: number | null}) => {

		let {data} = await add({
			variables: {
				deviceId: id,
				userId: user,
				rate: value,
			},
			update(cache, {data: {createRating}}) {
				const {ratings}: any = cache.readQuery({
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
										...ratings, edges: [{...ratings.edges[0], node: createRating.rating}]
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


	return { addRating, errorAdd }

}