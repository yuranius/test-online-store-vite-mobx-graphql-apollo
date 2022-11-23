import React, {FC, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import {CSSTransition} from "react-transition-group";
import styled from './Admin.module.scss'
import cn from "classnames";
import CreateDevice from "../../ui/modals/CreateDevice/CreateDevice";
import CreateTypeBrand from '../../ui/modals/CreateTypeBrand/CreateTypeBrand';


const Admin: FC = () => {
	const [showModal, setShowModal] = useState(false)
	const [showTransition, setShowTransition] = useState<boolean>(false)
	const [title, setTitle] = useState<string>('')
	const [id, setId] = useState<number>(0)

	const onShow = ({id, title}: { id: number, title: string }) => {
		setId(id)
		setTitle(title)
		setShowModal(true)
		setShowTransition(true)
	}

	const onHide = () => {
		setShowTransition(false)
		setTimeout(() => {
			setShowModal(false)
		}, 300)
	}

	const buttons = [
		{id: 1, title: 'Добавить бренд'},
		{id: 2, title: 'Добавить тип'},
		{id: 3, title: 'Добавить устройство'}
	]


	return (
			<Layout>
				<div className={cn(styled.wrapper, 'bg-white dark:bg-gray-800')}>
					{buttons.map(b =>
							<button key={b.id} className='bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-200'
							        onClick={() => onShow(b)}>{b.title}</button>)}
				</div>

				{id !== 3 ?
						<CSSTransition in={showTransition} classNames='modal' timeout={300}>
							<CreateTypeBrand
									id={id}
									showModal={showModal}
									title={title}
									onHide={onHide}
							/>
						</CSSTransition>
						:
						<CSSTransition in={showTransition} classNames='modal' timeout={300}>
							<CreateDevice
									id={id}
									showModal={showModal}
									title={title}
									onHide={onHide}
							/>
						</CSSTransition>
				}

			</Layout>
	);
};

export default Admin;