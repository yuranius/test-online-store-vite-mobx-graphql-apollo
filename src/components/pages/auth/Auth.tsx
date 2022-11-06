import React, {FC} from 'react';
import Form from "../../ui/form/Form";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../../router/consts";



const Auth:FC = () => {
	const location = useLocation()
	const isLoginPage = location.pathname === LOGIN_ROUTE















	return <Form isLoginPage={isLoginPage} />;
};

export default Auth;