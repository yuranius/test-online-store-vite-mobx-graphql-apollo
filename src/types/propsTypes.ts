import {DANGER, SUCCESS, WARNING} from "../utils/consts";
import React, {Dispatch, MutableRefObject, SetStateAction} from "react";
import {ToastElement} from "./hooksTypes";

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




export interface IStarRatingComponent {
	rate: number | undefined
	changeRating: (newRate: number) => void
}

export interface IPagination {
	total: number
	limit: number
}

export interface IPagination {
	total: number
	limit: number
	currentPage: number
	changePage: (page:number) => void
}

export interface IModal {
	id: number
	show: boolean
	onHide: () => void
	title: string
	onSave: (id: number) => void
	value: string
	setValue: Dispatch<SetStateAction<string>>
}

