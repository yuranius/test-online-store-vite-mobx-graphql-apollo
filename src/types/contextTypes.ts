import {TypeIcon} from "./propsTypes";



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
		setRef(param: any):void;
		setCurrentPage(param: number):void;
	}
}

export interface IShowMessage {
	typeIcon: TypeIcon
	text: string
}