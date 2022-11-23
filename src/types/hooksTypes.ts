import {Dispatch, SetStateAction} from "react";
import {Selected} from "./propsTypes";

export interface IUseToastAutoClose {
	toasts: Array<ToastElement>
	setToasts: Dispatch<SetStateAction<Array<ToastElement>>>
	autoClose: boolean
	autoCloseTime: number
}

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
	name:  string
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
