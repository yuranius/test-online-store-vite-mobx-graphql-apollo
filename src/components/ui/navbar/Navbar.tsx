import React, {FC} from 'react';
import styled from './Navbar.module.scss'
import BurgerMenu from "../burger-menu/BurgerMenu";
import logo from './../../../image/logo_shop_new.png'
import {Link} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, WARNING} from "../../../utils/consts";
import {useMutation} from "@apollo/client";
import {LOGOUT_USER} from "../../../query/authAPI";
import {useMessageContext} from "../../../hooks/useMessageContext";
import IconTheme from "./iconTheme/IconTheme";


const Navbar: FC = () => {

	// const {user} = useContext(Context)
	// const locate = useLocation()
	// const navigate = useNavigate()

	const {showMessage} = useMessageContext()
	const [logoutUser, {error}] = useMutation(LOGOUT_USER, {
		variables: {
			//id: user.user.objectId
		}
	})

	const logout = () => {
		logoutUser().then(({data}) => {
			if (data.logOut.ok) {
				localStorage.clear()
				// user.setIsAuth(false)
				// user.setUser({objectId: '', role: '', username: ''})
				// if (locate.pathname !== '/') {
				// 	navigate(SHOP_ROUTE)
				// }
			}
		})
	}

	if (error) {
		showMessage({text: error.message, typeIcon: WARNING})
	}

	let user = {user: {username: 'test', role: 'ADMIN'}, isAuth: true,}

	return (
			<div className={styled.wrapper}>
				<BurgerMenu/>
				<div className={styled.container}>
					<Link to={'/'} className={styled.logo}>
						<img src={logo} alt=""/>
					</Link>


					<nav className={styled.menu}>
						<div className={styled.username}>{user.user.username}</div>
						<IconTheme/>
						{user.isAuth ?
								<ul className={styled.list}>
									{user.user.role === 'ADMIN' &&
											<li>
												<Link to={ADMIN_ROUTE} className={styled.link}>
													<span className={styled.icon}>
														<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
														     xmlns="http://www.w3.org/2000/svg">
															<path strokeLinecap="round" strokeLinejoin="round"
															      strokeWidth="2"
															      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
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
											<span className={styled.basket}>3</span>
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
								</ul>
								:
								<ul className={styled.list}>
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
								</ul>
						}

					</nav>
				</div>
			</div>
	);
};

export default Navbar;