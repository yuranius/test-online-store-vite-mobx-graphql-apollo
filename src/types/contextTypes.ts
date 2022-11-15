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

}

export interface IShowMessage {
	typeIcon: TypeIcon
	text: string
}

export type IDeviceContext = {
	selectedType: Selected
	selectedBrand: Selected
	setSelectedType(param: Selected): void
	setSelectedBrand(param: Selected): void
}