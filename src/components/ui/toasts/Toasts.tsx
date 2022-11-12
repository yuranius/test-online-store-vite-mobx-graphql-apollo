import React, {FC, forwardRef, useImperativeHandle, useState} from 'react';
import {IToasts} from "../../../types/propsTypes";
import {SUCCESS, WARNING} from "../../../utils/consts";
import styled from './Toasts.module.scss'
import {CSSTransition} from "react-transition-group";
import { IShowMessage } from '../../../types/contextTypes';
import './alert.css'




const Toasts: FC<IToasts> = forwardRef(({}, ref) => {


	const [show, setShow] = useState(false)
	const [typeIcon, setTypeIcon] = useState(SUCCESS)
	const [text, setText] = useState('')

	let timeout:NodeJS.Timeout;

	useImperativeHandle(ref, () => ({
		showMessage({typeIcon, text}:IShowMessage) {
			setTypeIcon(typeIcon)
			setText(text)
			if (show) {
				setShow(false)
				clearTimeout(timeout)
				setShow(true)
			} else {
				setShow(true)
			}
		}
	}))

	const onClose = () => {
		setShow(false)
	}


	if (show) {
		timeout = setTimeout( () => {
			setShow(false)
		}, 5000)
	}



	return (
			<CSSTransition in={show} classNames='alert' timeout={300} unmountOnExit>
				<div className={styled.wrapper}>
					<div
							className={typeIcon === SUCCESS ? styled.blockIconGreen : typeIcon === WARNING ? styled.blockIconRed : styled.blockIconOrange}>
						{typeIcon === SUCCESS ?
								<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
								     xmlns="http://www.w3.org/2000/svg">
									<path
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
								</svg>
								:
								typeIcon === WARNING ?
										<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
										     xmlns="http://www.w3.org/2000/svg">
											<path
													d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"></path>
										</svg>
										: <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
										       xmlns="http://www.w3.org/2000/svg">
											<path
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
										</svg>
						}
						<span className="sr-only">Иконка</span>
					</div>
					<div className={styled.text}>{text}</div>
					<button type="button" className={styled.button} data-dismiss-target="#toast-success" aria-label="Close"
					        onClick={onClose}>
						<span className="sr-only">Закрыть</span>
						<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
						     xmlns="http://www.w3.org/2000/svg">
							<path
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
						</svg>
					</button>
				</div>
			</CSSTransition>
	);
})

export default Toasts;