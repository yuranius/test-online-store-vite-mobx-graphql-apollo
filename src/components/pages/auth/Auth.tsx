import React, {FC, useContext, useEffect, useState} from 'react';
import Form from "../../ui/form/Form";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE, SUCCESS, WARNING} from "../../../utils/consts";
import {handleButton} from "../../../types/propsTypes";
import {useRegistration} from "../../../hooks/API/useRegistration";
import {useMessageContext} from "../../../hooks/useMessageContext";
import {useLogin} from "../../../hooks/API/useLogin";
import {Context} from "../../../main";


const Auth: FC = () => {

	const location = useLocation()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {user} = useContext(Context)

	const {registration, loadingRegistration, errorRegistration, basket} = useRegistration()
	const {login, loadingLogin, errorLogin, data} = useLogin()
	const {showMessage} = useMessageContext()

	const isLoginPage = location.pathname === LOGIN_ROUTE

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


	useEffect(() => {
		if (errorLogin) {
			showMessage({text: 'Ошибка...', typeIcon: WARNING})
		} else if (data) {
			showMessage({text: `Удачных покупок ${user.user.username}`, typeIcon: SUCCESS})
			navigate(SHOP_ROUTE)
		}
	}, [errorLogin, data])

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