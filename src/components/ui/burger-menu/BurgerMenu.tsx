import React, {FC} from 'react';
import { slide as Menu } from 'react-burger-menu'
import {styles} from "./BurgerMenuStyles";
import styled from './BurgerMenu.module.scss'

const BurgerMenu:FC = () => {
	return (
			<div id="outer-container" className='md:hidden md:absolute'>
				<Menu right styles={styles} pageWrapId={ "pushRotate" } outerContainerId={ "outer-container" } >
					<main id="pushRotate">
						<a id="home" className={styled.item} href="/">Панель администратора</a>
						<a id="about" className={styled.item} href="/about">Корзина</a>
						<a id="contact" className={styled.item} href="/contact">О нас</a>

						<a  className={styled.item} href="">Выход</a>

						{/*{itemMenu.map()} TODO промапить ссылки*/}
					</main>
				</Menu>
			</div>
	);
};

export default BurgerMenu;