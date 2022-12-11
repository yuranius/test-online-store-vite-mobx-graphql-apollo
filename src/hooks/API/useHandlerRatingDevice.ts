import {useMutation} from "@apollo/client";
import {ADD_RATE, CHECK_RATE_USER} from "../../query/ratingAPI";

export const useHandlerRatingDevice = () => {

	const [addRating, {loading, error}] = useMutation(ADD_RATE)



	const addRatingDevice = ({value, user, id}: { value: number | null, user: string, id: string | undefined}) => {
		addRating({
			variables: {
				deviceId: id,
				userId: user,
				rate: value,
			},
			update( cache, {data:{createRating}}){
				const {ratings}:any = cache.readQuery({query: CHECK_RATE_USER,
					variables:{
						deviceId: id,
						userId: user,
						rate: value,
					}
				})

				console.log(ratings, createRating)

				cache.writeQuery( {
					query: CHECK_RATE_USER,
					data: {
						ratings: {
							...ratings, ...{edges: [...ratings.edges, {node: createRating.rating}]}
						}
					}
				})

			}
		}).then( res => console.log( '📌:',res))

	}

	return { addRatingDevice, loading, error }


}