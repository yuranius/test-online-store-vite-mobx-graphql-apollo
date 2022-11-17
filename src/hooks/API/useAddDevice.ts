import {useMutation} from "@apollo/client";
import {CREATE_DEVICE, CREATE_FILE, CREATE_INFO} from "../../query/deviceAPI";
import {IInfo} from "../../types/queryTypes";
import {IInfoAddDevice, IInfoCreateInfo, IUseAddDevice} from "../../types/hooksTypes";

export const useAddDevice = () => {
	const [createFile] = useMutation(CREATE_FILE)
	const [createDevice] = useMutation(CREATE_DEVICE)
	const [createInfo] = useMutation(CREATE_INFO)



	const addDevice = async (props: IUseAddDevice) => {

		const { file, name, price, device, info } = props

		let linkFile = await createFile({
			variables: {
				file: file
			}
		}).then( (t) => t.data.createFile.fileInfo.url)

		let createdDevice = await createDevice({
			variables: {
				name: name,
				price: price,
				img: linkFile,
				brandId: device.selectedBrand.id,
				typeId: device.selectedType.id,
				rating: 0
			}
		}).then( (data) => {
			return data.data.createDevice.device
		})


		{info && info.map( (el:IInfoAddDevice) => {
			createInfo({
				variables: {
					title: el.title,
					description: el.description,
					deviceId: createdDevice.objectId
				}
			})
			return createdDevice
		})}

	}
	return {addDevice}
}