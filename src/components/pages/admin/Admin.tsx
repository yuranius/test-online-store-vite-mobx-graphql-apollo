import React, {FC, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import CreateBrand from "../../ui/modals/CreateBrand/CreateBrand";
import {CSSTransition} from "react-transition-group";
import styled from './Admin.module.scss'


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

	return (
			<Layout>

				<div className={styled.wrapper}>
					<button onClick={onShow}>Добавить бренд</button>
					<button onClick={onShow}>Добавить тип</button>
					<button onClick={onShow}>Добавить устройство</button>
				</div>


				<CSSTransition in={show} classNames='modal' timeout={300}>
					<CreateBrand show={brandVisible} onHide={onHide}/>
				</CSSTransition>
			</Layout>
	);
};

export default Admin;