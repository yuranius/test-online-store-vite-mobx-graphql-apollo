import React, {FC, useState} from 'react';
import styled from './CreateTypeBrand.module.scss'
import cn from 'classnames'
import './style.css'
import {IModal} from "../../../../types/propsTypes";
import {useAddTypeBrand} from "../../../../hooks/API/useAddTypeBrand";
import {useMessageContext} from "../../../../hooks/useMessageContext";
import {DANGER, SUCCESS, WARNING} from "../../../../utils/consts";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";


const CreateTypeBrand: FC<IModal> = (props) => {
	const {showModal, onHide, id, title} = props
	const [value, setValue] = useState('')

	const {addType, addBrand, loading, error} = useAddTypeBrand()
	const {showMessage} = useMessageContext()
	
	const {types} = useGetTypesBrands()
	
	console.log( '📌:',types,'🌴 🏁')
	


	const onSave = async () => {
		if (value) {
			switch (id) {
				case 1: {
					const brand = await addBrand(value)
					onHide()
					setTimeout(() => {
						setValue('')
					}, 300)
					showMessage({text: `Бренд ${brand.name} добавлен`, typeIcon: SUCCESS})
					break;
				}
				case 2: {
					const type = await addType(value)
					onHide()
					setTimeout(() => {
						setValue('')
					}, 300)
					showMessage({text: `Тип ${type.name} добавлен`, typeIcon: SUCCESS})
					break;
				}
				default: {
					showMessage({text: 'Непредвиденная ошибка...(((', typeIcon: SUCCESS})
				}
			}
		} else {
			showMessage({text: 'Заполните поле', typeIcon: DANGER})
		}
	}

	if (error) {
		showMessage({text: error.message, typeIcon: WARNING})
	}


	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={styled.container}>
					<div className={cn(styled.cart, 'bg-white dark:bg-gray-600', loading && 'dark:bg-gray-400')}>
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
							        disabled={loading}
							        className={cn(styled.closeButton, loading && 'opacity-30')}
							        onClick={onHide}
							>Закрыть
							</button>
							<button type="button" disabled={loading} className={cn(styled.saveButton, loading && 'opacity-30')}
							        onClick={onSave}>Сохранить
							</button>
						</div>
					</div>
				</div>
			</div>
	);
};

export default CreateTypeBrand;