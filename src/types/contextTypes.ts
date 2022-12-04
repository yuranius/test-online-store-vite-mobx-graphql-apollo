import {Selected, TypeIcon} from "./propsTypes";


export type IContext = {
	user: {
		ref: any;
		isAuth: boolean;
		user: {
			objectId: string;
			username: string;
			role: string;
		}
		currentPage: number;
		setIsAuth(bool: boolean): void;
		setUser(param: { role: string; objectId: string; username: string }): void;
		setRef(param: any): void;
		setCurrentPage(param: number): void;
	}

	device: IDeviceContext
	basket: IBasketContext
}

export interface IShowMessage {
	typeIcon: TypeIcon
	text: string
}

export interface IDeviceContext {
	selectedType: Selected
	selectedBrand: Selected

	setSelectedType(param: Selected): void

	setSelectedBrand(param: Selected): void
}

export interface IBasketContext {
	quantityDevices: number

	setQuantityDevices(param: number): void

	addQuantityDevices(): void

	deleteQuantityDevices(): void
}