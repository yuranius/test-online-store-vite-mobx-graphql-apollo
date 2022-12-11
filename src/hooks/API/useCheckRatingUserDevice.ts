import {useLazyQuery} from "@apollo/client";
import {CHECK_RATE_USER} from "../../query/ratingAPI";
import {useState} from "react";
import {INodeRatingDevice} from "../../types/queryTypes";

export const useCheckRatingUserDevice = () => {
	const [checkRating, {loading, error}] = useLazyQuery(CHECK_RATE_USER)

	const checkRatingUserDevice = ({id, user}: { id: string | undefined, user: string }) => {
		return checkRating({
			variables: {
				userId: user,
				deviceId: id,
			}
		}).then(({data}) => {
					return data?.ratings.edges.map(({node}: INodeRatingDevice) => ({id: node.objectId, rate: node.rate}))
				}
		)

	}

	return {checkRatingUserDevice, loading, error}
}