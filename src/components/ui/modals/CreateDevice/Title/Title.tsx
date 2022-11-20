import React, {FC} from 'react';
import styled from './Title.module.scss'
import {ITitle} from "../../../../../types/propsTypes";

const Title:FC<ITitle> = ({title,onHide}) => {
	return (
			<div className={styled.title}>
				<h5 className='text-gray-500 dark:text-indigo-100'>{title}</h5>
				<button type="button"
				        onClick={onHide}
				>
									<span className={'dark:text-indigo-100'}>
										<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
											      d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</span>
				</button>
			</div>
	);
};

export default Title;