import {Selected} from "./propsTypes";


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

	selected: IDeviceContext
	basket: IBasketContext
}


export interface IDeviceContext {
	selectedType: Selected
	selectedBrand: Selected
	limit: number
	partitionSize: number
	count: number
	setSelectedType(param: Selected): void
	setSelectedBrand(param: Selected): void
	setCount(param: number):void
}

export interface IBasketContext {
	quantityDevices: number
	setQuantityDevices(param: number): void
	addQuantityDevices(): void
	deleteQuantityDevices(): void
}

export interface ISelectedRate {
	id: string
	rate: number
}