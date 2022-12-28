import {useMutation} from "@apollo/client";
import {CREATE_INFO} from "../../query/deviceAPI";
import {IInfoComponent} from "../../types/overTypes";

// @ts-ignore
import Parse from 'parse/dist/parse.min'

Parse.initialize('kkWwjLM6jwGw4cW1VeN7NoLuuAWWCcQOT3nwfcZD', 'F41sCleZ0JFerYg6Kjg4zHU94Fk0hmGAu3yI6VW7')
Parse.serverURL = 'https://parseapi.back4app.com'

export const useAddDevice = () => {

	const [createInfo] = useMutation(CREATE_INFO)

	const addDevice = async (props: { file: File | null; price: number; brandId: string; name: string; typeId: string; info: IInfoComponent[] }) => {

		const {file, name, price, brandId, typeId, info} = props

		try {
			const parseBrand = new Parse.Query('Brand')
			parseBrand.equalTo('objectId', brandId)
			const brand = await parseBrand.first();

			const parseType = new Parse.Query('Type')
			parseType.equalTo('objectId', typeId)
			const type = await parseType.first();

			let parseFile = new Parse.File('image', file)
			let Device = await Parse.Object.extend('Device')
			let device = new Device()

			device.set('brandId', brand)
			device.set('price', price)
			device.set('name', name)
			device.set('typeId', type)
			device.set('rating', 0)
			device.set('img', parseFile)

			let createDevice = await device.save()
			if (createDevice && info) {
				info.map((el: IInfoComponent) => {
					createInfo({
						variables: {
							title: el.title,
							description: el.description,
							deviceId: createDevice.id
						}
					})
				})
			}
			return {id: createDevice.id, ...props}
		} catch (error) {
			return undefined
		}


	}
	return {addDevice}
}