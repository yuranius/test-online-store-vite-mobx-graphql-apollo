import React, {FC, useState} from 'react';
import Form from "../../ui/form/Form";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE, SUCCESS} from "../../../utils/consts";
import Toasts from "../../ui/toasts/Toasts";
import {CSSTransition} from 'react-transition-group'
import './alert.css'

import styled from './Alert.module.scss'


const Auth:FC = () => {
	const location = useLocation()
	const isLoginPage = location.pathname === LOGIN_ROUTE

	const [show, setShow] = useState(false)















	return (
			<>


				<button onClick={() => setShow(!show)} className='w-32 p-2 rounded-lg bg-yellow-400 absolute left-[50%] top-32'>{show ? 'Скрыть' : 'Показать'}</button>
				{/*{show && <Toasts typeIcon={SUCCESS} text={'Это Важное сообщение'}/>}*/}


					<CSSTransition in={show} classNames='alert' timeout={500} unmountOnExit>
						<Toasts typeIcon={SUCCESS} text={'Это Важное сообщение'}/>
					</CSSTransition>



				<Form isLoginPage={isLoginPage} />
			</>

	);
};

export default Auth;