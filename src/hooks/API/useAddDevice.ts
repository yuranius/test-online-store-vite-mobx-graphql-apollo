import {useApolloClient, useMutation} from "@apollo/client";
import {CREATE_INFO, FETCH_DEVICES} from "../../query/deviceAPI";
import {IInfoComponent} from "../../types/overTypes";

// @ts-ignore
import Parse from 'parse/dist/parse.min'
import {useContext} from "react";
import {Context} from "../../main";


Parse.initialize('kkWwjLM6jwGw4cW1VeN7NoLuuAWWCcQOT3nwfcZD', 'F41sCleZ0JFerYg6Kjg4zHU94Fk0hmGAu3yI6VW7')
Parse.serverURL = 'https://parseapi.back4app.com'

export const useAddDevice = () => {

	const [createInfo] = useMutation(CREATE_INFO)
	const {cache} = useApolloClient()

	const {user, selected} = useContext(Context)
	let skip = user.currentPage * selected.limit - selected.limit


	const addDevice = async (props: { file: File | null; price: number; brandId: string; name: string; typeId: string; info: IInfoComponent[] }) => {

		let {devices}: any = cache.readQuery({
			query: FETCH_DEVICES,
			variables: {
				skip: skip,
				limit: selected.limit,
			}
		})

		console.log(devices)

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

			console.log(createDevice.attributes)
			console.log('🥎', devices)
			console.log('🪁', device)

			cache.writeQuery({
				query: FETCH_DEVICES,
				variables: {
					skip: skip,
					limit: selected.limit,
				},
				data: {
					devices: {
						...devices,
						count: devices.count + 1,
						...{
							edges: [...devices.edges, {
								__typename: 'DeviceEdge',
								node: {
									__typename: 'Device1243',
									objectId: createDevice.id,
									brandId: {
										objectId: brandId,
										__typename:"Brand"
									},
									typeId: {
										objectId: typeId,
										__typename:"Type"
									},
									img: {
										url: createDevice.attributes.img._url,
										__typename: 'FileInfo'
									},
									name: name,
									price,
									rating: 0
								}
							}]
						},
					}
				}
			})

			console.log('🎏', cache)

			return {id: createDevice.id, ...props}
		} catch (error) {
			return undefined
		}


	}
	return {addDevice}
}