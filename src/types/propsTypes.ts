import {DANGER, SUCCESS, WARNING} from "../utils/consts";

export interface IAuth {
	isLoginPage: boolean
}

export interface IToasts {
	typeIcon: typeof SUCCESS | typeof DANGER | typeof WARNING
	text: string
}