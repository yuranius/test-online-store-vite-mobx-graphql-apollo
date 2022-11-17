import {useContext} from "react";
import { Context } from "../main";
import {IShowMessage} from "../types/contextTypes";


export const useMessageContext = () => {
	const {user} = useContext(Context)

	const showMessage = ({ text, typeIcon}: IShowMessage) => {
		user.ref.current?.showMessage({text:text, typeIcon: typeIcon})
	};

	return {showMessage};
}





