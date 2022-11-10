import {DANGER, SUCCESS, WARNING} from "../utils/consts";
import React, {Dispatch, MutableRefObject, SetStateAction} from "react";

export interface IForm {
	isLoginPage: boolean
	setEmail: Dispatch<SetStateAction<string>>
	email:string
	setPassword:Dispatch<SetStateAction<string>>
	password:string
	handleButton: (e:handleButton) => void
	loading: boolean
}

export type handleButton = {
	preventDefault(): void;
}

export interface IToasts {
	ref?: React.ForwardedRef<unknown>
}

export type TypeIcon = 	typeof SUCCESS | typeof DANGER | typeof WARNING


export interface IToastPortal {
	autoClose: boolean
	autoCloseTime: number
	ref?: React.ForwardedRef<unknown>
}


export interface IToast {
	mode: string
	onClose: () => void
	message: string
}