import {useMutation} from "@apollo/client";
import {DELETE_DEVICE} from "../../query/deviceAPI";

export const useDeleteDevice = () => {

	const [device] = useMutation(DELETE_DEVICE)

	const deleteDevice = (id: string) => {
		device({
			variables: {
				id: id
			}
		}).then(data => console.log('📌:', data, '🌴 🏁')
		)
	}



	return {deleteDevice}
}