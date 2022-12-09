import React, {FC, useContext, useState} from 'react';
import { slide as Menu } from 'react-burger-menu'
import {styles} from "./BurgerMenuStyles";
import styled from './BurgerMenu.module.scss'
import IconTheme from "../navbar/IconTheme/IconTheme";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, WARNING} from "../../../utils/consts";
import FilterDevices from "../navbar/FilterDevices/FilterDevices";
import {Link, useLocation} from "react-router-dom";
import cn from "classnames";
import {Context} from "../../../main";
import {useLogoutUser} from "../../../hooks/useLogoutUser";
import {useMessageContext} from "../../../hooks/useMessageContext";

const BurgerMenu:FC = () => {

	//!---------- overflow hidden --------
	const [isOpen, setIsOpen] = useState(false)

	let isMenuOpen = function(state: { isOpen: boolean }) {
		setIsOpen(state.isOpen)
	};

	if (isOpen) {
		document.getElementById('root')?.classList.add('burger-menu-active')
	} else {
		document.getElementById('root')?.classList.remove('burger-menu-active')
	}
	// the styles for this class are in index.css

	//!----------- overflow hidden ----------

	const locate = useLocation()
	const {user, basket} = useContext(Context)

	const { logout, error } = useLogoutUser()
	const {showMessage} = useMessageContext()

	if (error) {
		showMessage({text: error.message, typeIcon: WARNING})
	}


	return (
			<div id="outer-container" className='md:hidden md:absolute'>
				<Menu right styles={styles} pageWrapId={ "pushRotate" } outerContainerId={ "outer-container" } onStateChange={isMenuOpen} >
					<IconTheme/>
					<main id="pushRotate">


						{locate.pathname === SHOP_ROUTE && <FilterDevices/>}
						{user.isAuth ?
								<>
									{user.user.role === 'ADMIN' &&
											<li>
												<Link to={ADMIN_ROUTE} className={styled.link}>
	dfg
												</Link>
											</li>
									}
									<li>
										<Link to={BASKET_ROUTE} className={styled.link}>
											{basket.quantityDevices}
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

						{/*{itemMenu.map()} TODO промапить ссылки*/}
					</main>
				</Menu>
			</div>
	);
};

export default BurgerMenu;