import React, {FC, useEffect, useState} from 'react';
import Form from "../../ui/form/Form";
import {useLocation} from "react-router-dom";
import {DANGER, LOGIN_ROUTE, SUCCESS, WARNING} from "../../../utils/consts";
import './alert.css'
import {handleButton} from "../../../types/propsTypes";
import {useRegistration} from "../../../hooks/useRegistration";
import {CSSTransition} from "react-transition-group";
import Toasts from "../../ui/toasts/Toasts";
import {useShowToasts} from "../../../hooks/useShowToasts";


const Auth: FC = () => {
	const location = useLocation()
	const isLoginPage = location.pathname === LOGIN_ROUTE

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {registration, loading, error, basket} = useRegistration()
	const {showToasts, text, show, onClose, typeIcon} = useShowToasts()



	const handleButton = (e: handleButton) => {
		e.preventDefault()
		registration({email, password})
	}

	useEffect( () => {
		if (!!basket) {
			showToasts({text: 'Пользователь зарегестрирован', typeIcon: SUCCESS})
		} else if (error) {
			showToasts({text: JSON.stringify(error), typeIcon: WARNING})
		}
	}, [basket, error])


	return (
			<>
				<Form
						isLoginPage={isLoginPage}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleButton={handleButton}
						loading={loading}
				/>
				<CSSTransition in={show} classNames='alert' timeout={300} unmountOnExit>
					<Toasts typeIcon={typeIcon} text={text} onClose={onClose}/>
				</CSSTransition>
			</>

	);
};

export default Auth;