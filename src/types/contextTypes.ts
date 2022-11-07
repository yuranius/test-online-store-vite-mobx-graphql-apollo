import {TypeIcon} from "./propsTypes";

export interface IContext {
	showToasts: () => void
}

export type Toasts = {
	text: string, typeIcon: TypeIcon
}