import React, {FC, useState} from 'react';
import styled from "../Navbar.module.scss";
import Filter from "../../modals/Filter/Filter";
import {CSSTransition} from "react-transition-group";
import './style.css'

const FilterDevices: FC = () => {

	const [showModal, setShowModal] = useState(false)
	const [showTransition, setShowTransition] = useState<boolean>(false)


	const onShow = () => {
		if (showModal) {
			setTimeout (() => {
				setShowModal(!showModal)
			}, 300)
		} else {
			setShowModal(!showModal)
		}
		setShowTransition(!showTransition)
	}
	

	return (

			<li>
				<button type='button' onClick={onShow} className={styled.link}>
					<span className={styled.icon}>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						     xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
						</svg>
					</span>
				</button>
				<CSSTransition in={showTransition} classNames='filter' timeout={300}>
					<Filter showModal={showModal} onShow={onShow}/>
				</CSSTransition>
			</li>

	);
};

export default FilterDevices;