import {Dispatch, SetStateAction} from "react";

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