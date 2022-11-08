import {useState} from "react";
import {SUCCESS} from "../utils/consts";
import {IShowToasts} from "../types/contextTypes";
import {TypeIcon} from "../types/propsTypes";

export const useShowToasts = () => {
	const [show, setShow] = useState(false)
	const [text, setText] = useState('')
	const [typeIcon, setTypeIcon] = useState<TypeIcon>(SUCCESS)

	let timeout: number;

	if (show) {
		timeout = setTimeout(() => {
			setShow(false)
		}, 3000)
	}

	const onClose = () => {
		setShow(!show)
		clearTimeout(timeout)
	}
	
	

	const showToasts = ({text, typeIcon}: IShowToasts) => {
		clearTimeout(timeout)
		setTypeIcon(typeIcon)
		setText(text)
		setShow(!show)
	}

	return {onClose, show, text, typeIcon, showToasts}
}