import {IRef, IShowMessage} from "../types/contextTypes";
import {useContext} from "react";
import {Context} from "../App";




export const useMessageContext = () => {
	const {ref} = useContext(Context)

	const showMessage = ({ text, typeIcon}: IShowMessage) => {
		ref?.current.showMessage({text:text, typeIcon: typeIcon})
	};

	return showMessage;

}





