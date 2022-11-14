import React, {FC, useState} from 'react';
import styled from './CreateBrand.module.scss'
import cn from 'classnames'
import './style.css'
import {IModal} from "../../../../types/propsTypes";


const CreateBrand: FC<IModal> = (props) => {
	const {show, onHide, id,title, onSave, value, setValue} = props
	return (
			<div className={cn(styled.wrapper, !show && 'hidden')}>
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
							<input type="text" className='
							bg-white dark:bg-blue-800
							focus:bg-white dark:focus:bg-blue-900
							text-gray-700 dark:text-violet-300
							'
							       value={value}
							       onChange={(event) => setValue(event.target.value)}
							/>
						</div>
						<div
								className={styled.footer}>
							<button type="button"
							        className={styled.closeButton}
							        onClick={onHide}
							>Закрыть</button>
							<button type="button" className={styled.saveButton} onClick={() => onSave(id)}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
	);
};

export default CreateBrand;