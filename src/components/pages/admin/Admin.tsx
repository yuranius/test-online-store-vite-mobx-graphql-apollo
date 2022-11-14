import React, {FC, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import CreateBrand from "../../ui/modals/CreateBrand/CreateBrand";
import {CSSTransition} from "react-transition-group";
import styled from './Admin.module.scss'
import cn from "classnames";


const Admin: FC = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	const [show, setShow] = useState(false)


	const onShow = () => {
		setShow(true)
		setBrandVisible(true)
	}

	const onHide = () => {
		setShow(false)
		setTimeout(() => {
			setBrandVisible(false)
		}, 300)
	}


	const buttonStyle ='bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-200';


	return (
			<Layout>

				<div className={cn(styled.wrapper, 'bg-white dark:bg-gray-800')}>
					<button className={buttonStyle} onClick={onShow}>Добавить бренд</button>
					<button className={buttonStyle} onClick={onShow}>Добавить тип</button>
					<button className={buttonStyle} onClick={onShow}>Добавить устройство</button>
				</div>


				<CSSTransition in={show} classNames='modal' timeout={300}>
					<CreateBrand show={brandVisible} onHide={onHide}/>
				</CSSTransition>
			</Layout>
	);
};

export default Admin;