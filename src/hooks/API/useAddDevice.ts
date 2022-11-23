import {useMutation} from "@apollo/client";
import {CREATE_DEVICE, CREATE_FILE, CREATE_INFO} from "../../query/deviceAPI";
import {IInfoComponent} from "../../types/overTypes";

export const useAddDevice = () => {
	const [createFile, {loading: loadingFile, error: errorFile}] = useMutation(CREATE_FILE)
	const [createInfo, {loading: loadingInfo, error: errorInfo}] = useMutation(CREATE_INFO)
	const [createDevice, {loading: loadingDevice, error: errorDevice}] = useMutation(CREATE_DEVICE)


	const addDevice = async (props: { file: any; price: number; brandId: any; name: any; typeId: any; info: IInfoComponent[] }) => {

		const {file, name, price, brandId, typeId, info} = props

		let linkFile = await createFile({
			variables: {
				file: file
			}
		}).then((t) => t.data.createFile.fileInfo.url)

		let createdDevice = await createDevice({
			variables: {
				name: name,
				price: +price,
				img: linkFile,
				brandId: brandId,
				typeId: typeId,
				rating: 0
			}
		}).then((data) => {
			return data.data.createDevice.device
		})


		{
			info && info.map((el: IInfoComponent) => {
				createInfo({
					variables: {
						title: el.title,
						description: el.description,
						deviceId: createdDevice.objectId
					}
				})
			})
		}
		return createdDevice
	}
	return {
		addDevice,
		loadingAddDevice: loadingDevice || loadingFile || loadingInfo,
		errorAddDevice: errorDevice || errorFile || errorInfo,
	}
}