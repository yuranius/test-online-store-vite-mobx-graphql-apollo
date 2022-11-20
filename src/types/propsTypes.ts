import {DANGER, SUCCESS, WARNING} from "../utils/consts";
import React, {Dispatch, SetStateAction} from "react";


export interface IForm {
	isLoginPage: boolean
	setEmail: Dispatch<SetStateAction<string>>
	email: string
	setPassword: Dispatch<SetStateAction<string>>
	password: string
	handleButton: (e: handleButton) => void
	loading: boolean
}

export type handleButton = {
	preventDefault(): void;
}

export interface IToasts {
	ref?: React.ForwardedRef<unknown>
}

export type TypeIcon = typeof SUCCESS | typeof DANGER | typeof WARNING


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
	changePage: (page: number) => void
}

export interface IModal {
	id: number
	showModal: boolean
	onHide: () => void
	title: string
}


export interface ITitle {
	onHide: () => void
	title: string
}

export interface IFooter {
	onHide: () => void
	onSave: (id: number) => void
	id: number
}

export interface IFormCreateDevice {
	types: Array<Selected>
	brands: Array<Selected>
	showModal: boolean
	onHide: () => void
}

export type Selected = {
	id: string
	name: string
}



