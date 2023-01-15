import React, {FC} from 'react';
import styled from './Form.module.scss'
import banner from "../../../image/auth-page-banner-dark.jpg";
import {IForm} from '../../../types/propsTypes';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../utils/consts";
import cn from "classnames";


const Form: FC<IForm> = ({isLoginPage, email, setEmail, password, setPassword, handleButton, loading}) => {
	return (
			<div className={cn(styled.container, 'bg-gray-200 dark:bg-gray-700')}>
				<div className={styled.component}>
					{/*Login form*/}
					<div className={cn(styled.form, 'bg-white dark:bg-gray-800')}>
						<div className="w-72">
							{/*Heading*/}
							<h1 className={cn(styled.title, 'dark:text-white')}>Добро пожаловать!</h1>
							<small className="text-gray-400">Введите свои данные для авторизации</small>
							{/*Form*/}
							<form className="mt-4">
								<div className={styled.inputForm}>
									<label className='dark:text-white'>Email</label>
									<input disabled={loading} type="email" placeholder="Введите Вашу почту"
									       value={email} onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className={styled.inputForm}>
									<label className='dark:text-white'>Password</label>
									<input disabled={loading} type="password" placeholder="******"
									       value={password} onChange={(e) => setPassword(e.target.value)}/>
								</div>
								<div className={styled.inputForm}>
									<button disabled={loading}
									        onClick={(e) => handleButton(e)}>{isLoginPage ? 'Войти' : 'Регистрация'}</button>
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
						<img src={banner} alt="basket"/>
					</div>
				</div>
			</div>
	);
};

export default Form;