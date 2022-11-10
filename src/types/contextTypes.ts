import {MutableRefObject, RefObject} from "react";
import {TypeIcon} from "./propsTypes";

// export type IApp =	MutableRefObject<HTMLInputElement> | null

export type IApp =	RefObject<HTMLElement | IRef > | null

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