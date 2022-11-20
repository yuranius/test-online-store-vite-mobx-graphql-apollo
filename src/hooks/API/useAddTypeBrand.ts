import {useMutation} from "@apollo/client";
import {CREATE_TYPE} from "../../query/deviceAPI";


export const useAddTypeBrand = () => {
	const [createType] = useMutation(CREATE_TYPE)

	const addType = (value: string) => {
		createType({
			variables: {
				name: value
			}
		}).then( (data) => {
			return data.data.createType.type
		})
	}

	return {addType}
}