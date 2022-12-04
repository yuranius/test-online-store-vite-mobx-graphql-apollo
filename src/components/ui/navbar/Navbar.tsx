import React, {FC, useContext} from 'react';
import styled from './Navbar.module.scss'
import BurgerMenu from "../burger-menu/BurgerMenu";
import logo from './../../../image/logo_shop_new.png'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, WARNING} from "../../../utils/consts";
import {useMutation} from "@apollo/client";
import {LOGOUT_USER} from "../../../query/authAPI";
import {useMessageContext} from "../../../hooks/useMessageContext";
import IconTheme from "./IconTheme/IconTheme";
import FilterDevices from "./FilterDevices/FilterDevices";
import {Context} from "../../../main";
import cn from "classnames";
import {observer} from "mobx-react-lite";


const Navbar: FC = observer(() => {

	const {user, basket} = useContext(Context)
	const locate = useLocation()
	const navigate = useNavigate()

	const {showMessage} = useMessageContext()
	const [logoutUser, {error}] = useMutation(LOGOUT_USER, {
		variables: {
			id: user.user.objectId
		}
	})

	console.log( '📌:',basket.quantityDevices,'🌴 🏁')
	
	
	const logout = () => {
		logoutUser().then(({data}) => {
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
					<nav className={styled.menu}>
						<div className={styled.username}>{user.user.username}</div>

						<ul className={styled.list}>
							<IconTheme/>
							{locate.pathname === SHOP_ROUTE && <FilterDevices/>}
							{user.isAuth ?
									<>
										{user.user.role === 'ADMIN' &&
												<li>
													<Link to={ADMIN_ROUTE} className={styled.link}>
													<span className={styled.icon}>
														<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
														     xmlns="http://www.w3.org/2000/svg">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
															      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
															      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
													</span>
													</Link>
												</li>
										}
										<li>
											<Link to={BASKET_ROUTE} className={styled.link}>
												<span className={styled.icon}>
													<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
													     xmlns="http://www.w3.org/2000/svg">
													<path strokeLinecap="round" strokeLinejoin="round"
													      strokeWidth="2"
													      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
												</span>
												<span
														className={cn(styled.basket, !basket.quantityDevices ? 'hidden opacity-0 transition-all' : 'opacity-100')}
												>{basket.quantityDevices}</span>
											</Link>
										</li>
										<li>
											<button className={styled.link} onClick={logout}>
											<span className={styled.icon}>
												<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
												     xmlns="http://www.w3.org/2000/svg">
													<path strokeLinecap="round" strokeLinejoin="round"
													      strokeWidth="2"
													      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
													</path>
												</svg>
											</span>
											</button>
										</li>
									</>
									:
									<li>
										<Link to={LOGIN_ROUTE} className={styled.link}>
											<span className={styled.icon}>
												<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
												     xmlns="http://www.w3.org/2000/svg">
													<path strokeLinecap="round" strokeLinejoin="round"
													      strokeWidth="2"
													      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
												</svg>
										</span>
										</Link>
									</li>
							}
						</ul>
					</nav>
				</div>
			</div>
	);
});

export default Navbar;