import React, {FC, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import CreateBrand from "../../ui/modals/CreateBrand/CreateBrand";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styled from './Admin.module.scss'
import cn from "classnames";
import CreateDevice from "../../ui/modals/CreateDevice/CreateDevice";


const Admin: FC = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	const [show, setShow] = useState<boolean>(false)
	const [title, setTitle] = useState<string>('')
	const [id, setId] = useState<number>(0)
	const [value, setValue] = useState('')


	const onShow = ({id, title}: { id: number, title: string }) => {
		setId(id)
		setTitle(title)
		setBrandVisible(true)
		setShow(true)
	}

	const onHide = () => {
		setShow(false)
		setTimeout(() => {
			setBrandVisible(false)
			setValue('')
		}, 300)
	}

	let onSave = (id: number) => {
		console.log('📌:', id, value, '🌴 🏁')

		onHide()
	}


	const buttonStyle = '';

	const buttons = [
		{id: 1, title: 'Добавить бренд'},
		{id: 2, title: 'Добавить тип'},
		{id: 3, title: 'Добавить устройство'}
	]

	console.log( '📌:',id,'🌴 🏁')
	
	
	return (
			<Layout>
				<div className={cn(styled.wrapper, 'bg-white dark:bg-gray-800')}>
					{buttons.map(b =>
							<button key={b.id} className='bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-200'
							        onClick={() => onShow(b)}>{b.title}</button>)}
				</div>

				{id !== 3 ?
						<CSSTransition in={show} classNames='modal' timeout={300}>
							<CreateBrand
									id={id}
									show={brandVisible}
									title={title}
									onHide={onHide}
									onSave={onSave}
									value={value}
									setValue={setValue}
							/>
						</CSSTransition>
						:
						<CSSTransition in={show} classNames='modal' timeout={300}>
							<CreateDevice
									id={id}
									show={brandVisible}
									title={title}
									onHide={onHide}
									onSave={onSave}
									value={value}
									setValue={setValue}/>
						</CSSTransition>
				}

			</Layout>
	);
};

export default Admin;