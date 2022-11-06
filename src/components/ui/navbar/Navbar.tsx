import React, {FC} from 'react';
import styled from './Navbar.module.scss'
import BurgerMenu from "../burger-menu/BurgerMenu";
import logo from './../../../image/logo_shop_new.png'

const Navbar: FC = () => {


	return (
			<div className={styled.wrapper}>
				<BurgerMenu/>
				<div className={styled.container}>
					<div className={styled.logo}>
						<img src={logo} alt=""/>
					</div>


					<nav className={styled.menu}>
						<ul className={styled.list}>
							<li>
								<a href="" className={styled.link}>Панель администратора</a>
							</li>
							<li>
								<a href="" className={styled.link}>Корзина</a>
							</li>
							<li>
								<a href="" className={styled.link}>Выход</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
	);
};

export default Navbar;