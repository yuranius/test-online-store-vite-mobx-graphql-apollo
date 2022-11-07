import React, {FC} from 'react';
import styled from './Form.module.scss'
import banner from "../../../image/auth-page-banner.jpg";
import {IAuth} from '../../../types/propsTypes';
import {Link} from "react-router-dom";
import {DANGER, LOGIN_ROUTE, REGISTRATION_ROUTE, SUCCESS, WARNING} from "../../../utils/consts";
import Toasts from "../toasts/Toasts";

const Form: FC<IAuth> = ({isLoginPage}) => {
	return (
			<div className={styled.container}>
				<div className={styled.component}>
					{/*Login form*/}
					<div className={styled.form}>
						<div className="w-72">
							{/*Heading*/}
							<h1 className={styled.title}>Добро пожаловать!</h1>
							<small className="text-gray-400">Введите свои данные для авторизации</small>


							{/*Form*/}
							<form className="mt-4">
								<div className={styled.inputForm}>
									<label>Email</label>
									<input type="email" placeholder="Введите Вашу почту"/>
								</div>

								<div className={styled.inputForm}>
									<label>Password</label>
									<input type="password" placeholder="*****"/>
								</div>


								<div className={styled.inputForm}>
									<button>{isLoginPage ? 'Войти' : 'Регистрация'}</button>
								</div>
							</form>

							{/*Footer*/}
							<div className={styled.footer}>
								<span>{isLoginPage ? 'Нет аккаунта?' : 'Есть аккаунт?'}</span>
								{isLoginPage
										? <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
										: <Link to={LOGIN_ROUTE}>Вход</Link>
								}
							</div>
						</div>
					</div>

					{/*Login banner*/}
					<div className={styled.banner}>
						<img src={banner}/>
					</div>
				</div>




			</div>
	);
};

export default Form;