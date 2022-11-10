import React, {FC, useEffect, useState} from 'react';
import Form from "../../ui/form/Form";
import {redirect, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE, SUCCESS, WARNING} from "../../../utils/consts";
import {handleButton} from "../../../types/propsTypes";
import {useRegistration} from "../../../hooks/useRegistration";
import {useMessageContext} from "../../../hooks/useMessageContext";


const Auth: FC = () => {


	const showMessage = useMessageContext()

	const location = useLocation()
	const isLoginPage = location.pathname === LOGIN_ROUTE
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {registration, loading, error, basket} = useRegistration()


	const handleButton = (e: handleButton) => {
		e.preventDefault()
		if (isLoginPage) {
			showMessage({text: 'Error', typeIcon: SUCCESS})
			navigate(SHOP_ROUTE)
		} else {
			registration({email, password})
		}
	}


	useEffect(() => {
		if (error) {
			showMessage({text: error, typeIcon: WARNING})
		} else if (basket) {
			showMessage({text: 'Пользователь зарегестрирован', typeIcon: SUCCESS})
			//navigate(SHOP_ROUTE)
		}
	}, [error, basket])


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
			</>

	);
};

export default Auth;