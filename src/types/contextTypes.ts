import {Dispatch, MutableRefObject, RefObject, SetStateAction} from "react";
import {TypeIcon} from "./propsTypes";
import {ToastElement} from "./hooksTypes";

// export type IApp =	MutableRefObject<HTMLInputElement> | null

export type IApp =	{
	ref: IRef | null
	isAuth: boolean | null
	setIsAuth: Dispatch<SetStateAction<boolean>>
}

//RefObject<HTMLElement | IRef > | null


export interface IRef {
	current: showMessage
}

type showMessage = {
	showMessage: (arg0: DataMessage) => void
}

type DataMessage = IShowMessage


export interface IShowMessage {
	typeIcon: TypeIcon
	text: string
}