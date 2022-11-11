import React, {FC} from 'react';
import styled from './Navbar.module.scss'
import BurgerMenu from "../burger-menu/BurgerMenu";
import logo from './../../../image/logo_shop_new.png'
import {Link} from "react-router-dom";
import {User} from "../layout/Layout";


const Navbar: FC<User> = ({user}) => {


	return (
			<div className={styled.wrapper}>
				<BurgerMenu/>
				<div className={styled.container}>
					<Link to={'/'} className={styled.logo}>
						<img src={logo} alt=""/>
					</Link>


					<nav className={styled.menu}>
						{user ?
								<ul className={styled.list}>
										<li>
											<Link to="" className={styled.link}>Панель администратора</Link>
										</li>
										<li>
											<Link to='./basket' className={styled.link}>Корзина</Link>
										</li>
										<li>
											<Link to='./login' className={styled.link}>{user.username}</Link>
										</li>
								</ul>
								:
								<ul className={styled.list}>
									<li>
										<Link to='./login' className={styled.link}>Авторизация</Link>
									</li>
								</ul>
						}
					</nav>
				</div>
			</div>
	);
};

export default Navbar;