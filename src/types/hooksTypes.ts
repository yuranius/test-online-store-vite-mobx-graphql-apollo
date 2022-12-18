import {TypeIcon} from "./propsTypes";


export type ToastElement = {
	id: string
	mode: string
	onClose: () => void
	message: string
}


export type GetDevice = {
	id?: string
}

export interface IUseAddDevice {
	name: string
	price: number
	file: FormDataEntryValue | null
	brandId: string
	typeId: string
	info: Array<IInfoCreateInfo>
}

export type IInfoAddDevice = {
	number: string
	title: string
	description: string
}

export type IInfoCreateInfo = {
	title: string
	description: string
	objectid: string
}

export interface IShowMessage {
	typeIcon: TypeIcon
	text: string
}

export interface IAddRatingDevice {
	value: number | null
	user: string
	id: string | undefined
	rateId: string
}
