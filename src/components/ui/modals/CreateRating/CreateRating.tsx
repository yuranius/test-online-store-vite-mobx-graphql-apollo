import React, {FC, useContext, useEffect, useState} from 'react';
import styled from './CreateRating.module.scss'
import cn from 'classnames'
import './style.css'
import {IModalCreateRating} from "../../../../types/propsTypes";
import {useMessageContext} from "../../../../hooks/useMessageContext";
import {SUCCESS, WARNING} from "../../../../utils/consts";
import {createArrForRatingOption} from "../../../../utils/createArrForRatingOption";
import SelectField from "../CreateDevice/Formic/SelectField";
import {useHandlerRatingDevice} from "../../../../hooks/API/useHandlerRatingDevice";
import {Context} from "../../../../main";
import {useParams} from "react-router-dom";
import {useCheckRatingUserDevice} from "../../../../hooks/API/useCheckRatingUserDevice";


const CreateRating: FC<IModalCreateRating> = (props) => {
	const {showModal, onHide} = props

	const {user, selected} = useContext(Context)
	const {id} = useParams()


	const [rate, setRate] = useState({value: selected.selectedRate, label: selected.selectedRate})


	const {addRatingDevice, loading, error} = useHandlerRatingDevice()
	const {showMessage} = useMessageContext()


	const closeModal = () => {
		setTimeout(() => {
			setRate({value: null, label: null})
		}, 300)
		onHide()
	}

	const changeRate = (value: any) => {
		setRate(value)
	}


	const onSave = async () => {
		addRatingDevice({value: rate.value, user: user.user.objectId, id: id})
		onHide()
		setTimeout(() => {
			setRate({value: null, label: null})
		}, 300)
		showMessage({text: `Ваш голос учтен`, typeIcon: SUCCESS})
	}

	if (error) {
		showMessage({text: error.message, typeIcon: WARNING})
	}

	console.log(rate)


	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={styled.container}>
					<div className={cn(styled.cart, 'bg-white dark:bg-gray-600', loading && 'dark:bg-gray-400')}>
						<div className={styled.title}>
							<h5 className='text-gray-500 dark:text-indigo-100'>Оцените товар</h5>
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
							<SelectField options={createArrForRatingOption()} value={rate} className={''} onChange={changeRate}/>
						</div>
						<div
								className={styled.footer}>
							<button type="button"
							        disabled={loading}
							        className={cn(styled.closeButton, loading && 'opacity-30')}
							        onClick={closeModal}
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

export default CreateRating;