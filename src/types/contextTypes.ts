import {TypeIcon} from "./propsTypes";
import {MutableRefObject} from "react";


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


// export interface IRef {
// 	current: showMessage
// }
//
// type showMessage = {
// 	showMessage: (arg0: DataMessage) => void
// }
//
// type DataMessage = IShowMessage
//
//
export interface IShowMessage {
	typeIcon: TypeIcon
	text: string
}