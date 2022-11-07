import {DANGER, SUCCESS, WARNING} from "../utils/consts";
import React, {Dispatch, SetStateAction} from "react";

export interface IAuth {
	isLoginPage: boolean
	setEmail: Dispatch<SetStateAction<string>>
	email:string
	setPassword:Dispatch<SetStateAction<string>>
	password:string
	handleButton: (e:handleButton) => void
}

export type handleButton = {
	preventDefault(): void;
}

export interface IToasts {
	typeIcon: TypeIcon
	text: string
	onClose: () => void
}

export type TypeIcon = 	typeof SUCCESS | typeof DANGER | typeof WARNING
