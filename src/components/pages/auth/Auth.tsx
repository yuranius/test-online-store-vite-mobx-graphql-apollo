import React, {FC, useContext, useState} from 'react';
import Form from "../../ui/form/Form";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../../../utils/consts";
import './alert.css'
import {handleButton} from "../../../types/propsTypes";
import {useRegistration} from "../../../hooks/useRegistration";
import {useShowToasts} from "../../../hooks/useShowToasts";
import {Context} from "../../../App";


const Auth:FC = () => {
	const location = useLocation()
	const isLoginPage = location.pathname === LOGIN_ROUTE

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {showToasts} = useContext(Context)

	const {registration, loading, error} = useRegistration()


	const handleButton = (e:handleButton) => {
		e.preventDefault()

		console.log( '📌:',email,'🌴 🏁')
		

		// registration({email, password})
	}


	if(error) {

	}
	


	return (
			<>
				<button className='w-32 p-3 rounded bg-orange-400 absolute' onClick={handleButton}>test</button>
				<Form
						isLoginPage={isLoginPage}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleButton={handleButton}
				/>
			</>

	);
};

export default Auth;