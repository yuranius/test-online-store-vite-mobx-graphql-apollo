import {TypeIcon} from "./propsTypes";

export type GetDevice = {
	id?: string
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
