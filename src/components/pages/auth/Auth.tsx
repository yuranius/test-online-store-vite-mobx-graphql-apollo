import React, {FC, useContext, useEffect, useState} from 'react';
import Form from "../../ui/form/Form";
import {redirect, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE, SUCCESS, WARNING} from "../../../utils/consts";
import {handleButton} from "../../../types/propsTypes";
import {useRegistration} from "../../../hooks/API/useRegistration";
import {useMessageContext} from "../../../hooks/useMessageContext";
import {Context} from "../../../App";
import {useLogin} from "../../../hooks/API/useLogin";



const Auth: FC = () => {


	const showMessage = useMessageContext()

	const location = useLocation()
	const isLoginPage = location.pathname === LOGIN_ROUTE
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {registration, loadingRegistration , errorRegistration, basket} = useRegistration()
	const {login, loadingLogin, errorLogin, user} = useLogin()


	const handleButton = (e: handleButton) => {
		e.preventDefault()
		if (isLoginPage) {
			login({email, password})
		} else {
			registration({email, password})
		}
	}

	//TODO надо проверять на наличие сессии

	useEffect(() => {
		if (errorRegistration) {
			showMessage({text: errorRegistration, typeIcon: WARNING})
		} else if (basket) {
			showMessage({text: 'Пользователь зарегестрирован', typeIcon: SUCCESS})
		}
	}, [errorRegistration, basket])


	useEffect( () => {
		if (errorLogin) {
			showMessage({text:'Ошибка...', typeIcon: WARNING})
		} else if (user) {
			showMessage({text: 'Удачно', typeIcon: SUCCESS})
			navigate(SHOP_ROUTE)
		}

		console.log( '📌:',user,'🌴 🏁')

	}, [errorLogin, user])


	let loading = loadingLogin || loadingRegistration

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