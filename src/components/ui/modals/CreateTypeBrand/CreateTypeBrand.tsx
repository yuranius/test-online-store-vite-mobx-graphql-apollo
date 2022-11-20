import React, {FC, useState} from 'react';
import styled from './CreateTypeBrand.module.scss'
import cn from 'classnames'
import './style.css'
import {IModal} from "../../../../types/propsTypes";
import {useAddTypeBrand} from "../../../../hooks/API/useAddTypeBrand";


const CreateTypeBrand:FC<IModal> = (props) => {
	const {showModal, onHide, id, title} = props
	const [value, setValue] = useState('')

	const {addType} = useAddTypeBrand()

	const onSave = () => {
		console.log( '📌:',id, value,'🌴 🏁')

		addType(value)

		onHide()
		setTimeout( () => {
			setValue('')
		}, 300)
	}


	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={styled.container}>
					<div className={cn(styled.cart, 'bg-white dark:bg-gray-600')}>
						<div className={styled.title}>
							<h5 className='text-gray-500 dark:text-indigo-100'>{title}</h5>
							<button type="button"
							        onClick={onHide}
							>
									<span className={'dark:text-indigo-100'}>
										<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="5 5 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
											      d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</span>
							</button>
						</div>
						<div className={styled.body}>
							<input type="text"
							       className={cn(styled.inputText, 'focus:border-[#6366f1] text-gray-500 dark:focus:border-white dark:bg-inherit dark:text-indigo-100')}
							       value={value}
							       onChange={(event) => setValue(event.target.value)}
							/>
						</div>
						<div
								className={styled.footer}>
							<button type="button"
							        className={styled.closeButton}
							        onClick={onHide}
							>Закрыть
							</button>
							<button type="button" className={styled.saveButton} onClick={onSave}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
	);
};

export default CreateTypeBrand;