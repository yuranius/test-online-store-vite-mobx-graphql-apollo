import React, {FC, memo, useContext, useEffect, useState} from 'react';
import styled from './CreateRating.module.scss'
import cn from 'classnames'
import './style.css'
import {IModalCreateRating} from "../../../../types/propsTypes";
import {useMessageContext} from "../../../../hooks/useMessageContext";
import {DANGER, SUCCESS, WARNING} from "../../../../utils/consts";
import {createArrForRatingOption} from "../../../../utils/createArrForRatingOption";
import SelectField from "../CreateDevice/Formic/SelectField";
import {useHandlerRatingDevice} from "../../../../hooks/API/ratingDevice/useHandlerRatingDevice";
import {Context} from "../../../../main";
import {useParams} from "react-router-dom";
import button from "../../button/Button";


const CreateRating: FC<IModalCreateRating> = memo((props) => {
	const {showModal, onHide, selectedRate, setSelectedRate} = props

	const {user} = useContext(Context)
	const {id} = useParams()

	const [rate, setRate] = useState({value: selectedRate.rate, label: selectedRate.rate})

	useEffect(() => {
		setRate({value: selectedRate.rate, label: selectedRate.rate})
	}, [selectedRate])


	const {addRatingDevice, deleteRatingDevice, loading, error} = useHandlerRatingDevice()
	const {showMessage} = useMessageContext()


	const closeModal = () => {
		setTimeout(() => {
			setRate({value: selectedRate.rate, label: selectedRate.rate})
		}, 300)
		onHide()
	}

	const changeRate = (value: any) => {
		setRate(value)
	}

	const onSave = async () => {
		let {id: newId, rate: newRate}: any = await addRatingDevice({
			value: rate.value,
			user: user.user.objectId,
			id,
			rateId: selectedRate.id
		})

		onHide()
		setTimeout(() => {
			setRate({value: newRate, label: newRate})
			setSelectedRate({id: newId, rate: newRate})
		}, 300)
		showMessage({text: `Ваш голос учтен`, typeIcon: SUCCESS})
	}

	const onDelete = async () => {
		await deleteRatingDevice({
			value: rate.value,
			user: user.user.objectId,
			id,
			rateId: selectedRate.id
		})
		onHide()
		setTimeout(() => {
			setRate({value: 0, label: 0})
			setSelectedRate({id: '', rate: 0})
		}, 300)
		showMessage({text: `Ваш голос удален`, typeIcon: DANGER})
	}

	if (error) {
		showMessage({text: error.message, typeIcon: WARNING})
	}

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
							{selectedRate.rate ?
									<button type="button"
									        disabled={loading}
									        className={cn(styled.deleteButton, loading && 'opacity-30')}
									        onClick={onDelete}>

										Удалить
									</button> : null}
							<button type="button"
							        disabled={loading}
							        className={cn(styled.closeButton, loading && 'opacity-30')}
							        onClick={closeModal}
							>Закрыть
							</button>
							<button type="button" disabled={loading} className={cn(styled.saveButton, loading && 'opacity-30')}
							        onClick={onSave}>{selectedRate.rate ? 'Изменить' : 'Сохранить'}
							</button>
						</div>
					</div>
				</div>
			</div>
	);
});

export default CreateRating;