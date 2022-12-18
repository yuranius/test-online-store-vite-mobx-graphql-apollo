import {DANGER, SUCCESS, WARNING} from "../utils/consts";
import React, {Dispatch, SetStateAction} from "react";
import {ISelectedRate} from "./contextTypes";


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
}


export interface IPagination {
	total: number
	limit: number
	currentPage: number
	changePage: (page: number) => void
	portionSize: number
}

export interface IModal {
	id: number
	showModal: boolean
	onHide: () => void
	title: string
}

export interface IModalCreateRating {
	showModal: boolean
	onHide: () => void
	selectedRate: ISelectedRate
	setSelectedRate: Dispatch<SetStateAction<ISelectedRate>>
}


export interface ITitle {
	onHide: () => void
	title: string
}

export interface IFormCreateDevice {
	showModal: boolean
	onHide: () => void
}

export type Selected = {
	id: string
	name: string
}

export interface ISelectField {
	options: any
	value: any
	className: any
	onChange: (value: () => void) => void
}

export interface IModalFilterRating {
	showModal: boolean
	onShow: () => void
}

export interface IBasketDeviceItem {
	device: IBasketDevice
	handlerDelete: (objectId: string, deviceId: string, deviceName: string) => void
	loading: boolean
}


export interface IBasketDevice {
	objectId: string
	deviceId: string
	img: string
	price: number
	name: string
}


