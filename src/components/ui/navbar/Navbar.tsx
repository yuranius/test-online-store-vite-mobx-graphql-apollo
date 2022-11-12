import React, {FC, useContext} from 'react';
import styled from './Navbar.module.scss'
import BurgerMenu from "../burger-menu/BurgerMenu";
import logo from './../../../image/logo_shop_new.png'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, DANGER, LOGIN_ROUTE, SHOP_ROUTE, WARNING} from "../../../utils/consts";
import {useMutation} from "@apollo/client";
import {LOGOUT_USER} from "../../../query/authAPI";
import {useMessageContext} from "../../../hooks/useMessageContext";
import {Context} from "../../../main";


const Navbar:FC = () => {

	const {user} = useContext(Context)
	const locate = useLocation()
	const navigate = useNavigate()

	const showMessage = useMessageContext()
	const [logoutUser, {error}] = useMutation(LOGOUT_USER, {
		variables:{
			id: user.user.objectId
		}
	})

	const logout = () => {
		logoutUser().then( ({data}) => {
			if (data.logOut.ok) {
				localStorage.clear()
				user.setIsAuth(false)
				user.setUser({objectId: '', role: '', username: ''})
				if (locate.pathname !== '/') {
					navigate(SHOP_ROUTE)
				}
			}
		})
	}

	if (error) {
		showMessage({text: error.message, typeIcon: WARNING})
	}

	return (
			<div className={styled.wrapper}>
				<BurgerMenu/>
				<div className={styled.container}>
					<Link to={'/'} className={styled.logo}>
						<img src={logo} alt=""/>
					</Link>

					{user.user.username}

					<nav className={styled.menu}>
						{user.isAuth ?
								<ul className={styled.list}>
									{user.user.role === 'ADMIN' &&
											<li>
												<Link to={ADMIN_ROUTE} className={styled.link}>Панель администратора</Link>
											</li>
									}
									<li>
										<Link to={BASKET_ROUTE} className={styled.link}>Корзина 🗑</Link>
									</li>
									<li>
										<button className={styled.link} onClick={logout}>Выход 📤</button>
									</li>
								</ul>
								:
								<ul className={styled.list}>
									<li>
										<Link to={LOGIN_ROUTE} className={styled.link}>Авторизация</Link>
									</li>
								</ul>
						}
					</nav>
				</div>
			</div>
	);
};

export default Navbar;