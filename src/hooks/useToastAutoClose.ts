import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {IUseToastAutoClose, ToastElement} from "../types/hooksTypes";



export const useToastAutoClose = ({toasts, setToasts, autoClose, autoCloseTime}:IUseToastAutoClose) => {

	const [removing, setRemoving] = useState('')

	useEffect( () => {
		if (removing) {
			setToasts((toast:Array<ToastElement>) => toast.filter(t => t.id !== removing))
		}
	}, [removing, setToasts])

	useEffect( () => {
		if (autoClose && toasts.length) {
			const id = toasts[toasts.length - 1].id
			setTimeout( () => {
				// setToasts(toasts.filter(t => t.id !== toasts[toasts.length - 1].id))
				setRemoving(id)
			}, autoCloseTime)
		}
	}, [toasts, autoCloseTime])
}