import React, {FC, memo, useContext, useEffect, useState} from 'react';
import styled from './Device.module.scss'
import {useGetDevice} from "../../../hooks/API/useGetDevice";
import {useNavigate, useParams} from "react-router-dom";
import StarRating from "../../ui/star-rating/StarRating";
import Layout from "../../ui/layout/Layout";
import {format} from "../../../utils/formatter";
import {Context} from "../../../main";
import cn from "classnames";
import {INodeInfo} from "../../../types/queryTypes";
import {DANGER, SHOP_ROUTE, SUCCESS, WARNING} from "../../../utils/consts";
import {useAddDeviceBasket} from "../../../hooks/API/useAddDeviceBasket";
import Loader from "../../ui/loader/Loader";
import {useMessageContext} from "../../../hooks/useMessageContext";
import {CSSTransition} from "react-transition-group";
import {useCheckRatingUserDevice} from "../../../hooks/API/useCheckRatingUserDevice";
import CreateRating from "../../ui/modals/CreateRating/CreateRating";
import {useDeleteDevice} from "../../../hooks/API/useDeleteDevice";



const Device: FC = memo(() => {
	const {id} = useParams()
	const navigate = useNavigate()
	const {device, getDevice} = useGetDevice()
	const {user, basket, selected} = useContext(Context)

	const {addDeviceBasket, loading: loadingAddDevice, error: errorAddDevice} = useAddDeviceBasket()
	const { destroyDevice, loading: loadingDestroyDevice } = useDeleteDevice()
	const {checkRatingUserDevice, loading: loadingCheckRating, error: errorCheckRating} = useCheckRatingUserDevice()
	const {showMessage} = useMessageContext()

	const [rate, setRate] = useState({id: '', rate: 0})
	const [showModal, setShowModal] = useState(false)
	const [showTransition, setShowTransition] = useState<boolean>(false)

	let loading = loadingAddDevice || loadingCheckRating || loadingDestroyDevice
	let error = errorAddDevice || errorCheckRating

	useEffect(() => {
		getDevice({id})
		if(user.user.objectId) {
			console.log('check')
			checkRatingUserDevice({id: id, user: user.user.objectId}).then(([{id, rate}]) => {
				setRate({id: id, rate:rate})
			})
		}
	}, [user.user.objectId])

	useEffect ( () => {
		getDevice({id})
	},[rate])


	const onShow = () => {
		setShowModal(true)
		setShowTransition(true)
	}

	const onHide = () => {
		setShowTransition(false)
		setTimeout(() => {
			setShowModal(false)
		}, 300)
	}


	const handleAddBasket = async () => {
		await addDeviceBasket(id!, user.user.objectId).then(res => {
			if (res === 0) {
				showMessage({text: `Товар ${device?.name} добавлен в корзину`, typeIcon: SUCCESS})
				basket.addQuantityDevices()
			} else if (res >= 1) {
				showMessage({text: 'Данный товар уже есть в корзине', typeIcon: WARNING})
			} else {
				showMessage({text: 'Что-то пошло не так...', typeIcon: DANGER})
			}
		})
	}


	const handlerDelete = () => {
		let check = confirm('Вы уверены что хотите удалить этот товар?')
		if (check) {
			destroyDevice(id).then(({deleteDevice}) => {
					showMessage({text:`Товар ${deleteDevice.device.name} удален из списка товаров`, typeIcon: DANGER})
					navigate(SHOP_ROUTE)
			})
		}
	}

	return (
			<Layout>
				<div className={styled.wrapper}>
					<div className={styled.container}>
						<div className={styled.image}>
							<img src={device?.img.url} alt={device?.name}/>
						</div>
						<div className={cn(styled.description, 'dark:text-blue-100 text-[#6366f1]')}>
							<div className={styled.title}>
								<div className={styled.name}>{device?.name}</div>
								<div className={styled.price}>{format(device?.price!)}</div>
							</div>
							<div className={cn(styled.rate, 'dark:text-blue-100 text-[#6366f1]')}>
								<StarRating rate={device?.rating}/>
								<div>{device?.rating}</div>
							</div>
							{!!rate.rate &&
									<div className={cn(styled.rateUser, 'dark:text-blue-100 text-[#6366f1]')}>
										Ваша оценка: {rate.rate}
									</div>
							}
							<div className={styled.info}>
								<h1>Характеристики:</h1>
								{device?.info?.map((info: INodeInfo, index) =>
										<div key={info.node.objectId}
										     className={index % 2 === 0 ? cn(styled.infoOne, 'bg-gray-200 dark:bg-gray-600') : styled.infoTwo}>
											{info.node.title} - {info.node.description}
										</div>
								)}
							</div>
						</div>
					</div>
					<div className={styled.button}>
						{user.isAuth &&
								<>
									<button onClick={onShow} disabled={loading}>Оценить</button>
									<button onClick={handleAddBasket} disabled={loading}>Добавить в корзину</button>
								</>
						}
						{user.user.role === 'ADMIN' &&
								<button className={styled.buttonDelete} onClick={handlerDelete} disabled={loading}>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									     xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
									</svg>
								</button>
						}
					</div>
					<CSSTransition in={showTransition} classNames='modal' timeout={300}>
						<CreateRating
								selectedRate={rate}
								setSelectedRate={setRate}
								showModal={showModal}
								onHide={onHide}
						/>
					</CSSTransition>
				</div>
			</Layout>

	);
});

export default Device;