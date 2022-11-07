import {useState} from "react";
import {SUCCESS} from "../utils/consts";
import {IContext} from "../types/contextTypes";

export const useShowToasts = () => {
	const [show, setShow] = useState(false)
	const [text, setText] = useState('')
	const [typeIcon, setTypeIcon] = useState(SUCCESS)


	if (show) {
		setTimeout(() => {
			setShow(!show)
		}, 3000)
	}


	const onClose = () => {
		setShow(!show)
	}

	const showToasts = ({text, typeIcon}:IContext) => {
		setTypeIcon(typeIcon)
		setText(text)
		setShow(true)
	}










	return {onClose, show, setShow, text, setText, showToasts}
}