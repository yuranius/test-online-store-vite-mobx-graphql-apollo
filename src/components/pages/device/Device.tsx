import React, {FC, useContext, useEffect} from 'react';
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


const Device: FC = () => {
	const {id} = useParams()
	const navigate = useNavigate()
	const {device, getDevice} = useGetDevice()
	const {user, basket} = useContext(Context)

	const {addDeviceBasket, loading, error} = useAddDeviceBasket()
	const {showMessage} = useMessageContext()


	useEffect(() => {
		getDevice({id})
	}, [])


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


	const changeRating = (newRate: number) => {
		console.log('📌:', newRate, '🌴 🏁')
	}

	const handlerDelete = () => {
		let check = confirm('Вы уверены что хотите удалить этот товар?')
		if (check) {
			setTimeout(() => navigate(SHOP_ROUTE), 2000)
		}
	}


	return (
			<Layout>
				{loading && <Loader/>}
				<div className={styled.wrapper}>
					<div className={styled.container}>
						<div className={styled.image}>
							<img src={device?.img} alt={device?.name}/>
						</div>
						<div className={cn(styled.discription, 'dark:text-blue-100 text-[#6366f1]')}>
							<div className={styled.title}>
								<div className={styled.name}>{device?.name}</div>
								<div className={styled.price}>{format(device?.price!)}</div>
							</div>
							<div className={cn(styled.rate, 'dark:text-white')}>
								<StarRating rate={device?.rating} changeRating={changeRating}/>
								<div>{device?.rating}</div>
							</div>

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
									<button>Оценить</button>
									<button onClick={handleAddBasket}>Добавить в корзину</button>
								</>
						}
						{user.user.role === 'ADMIN' &&
								<button className={styled.buttonDelete} onClick={handlerDelete}>Удалить товар из базы</button>
						}
					</div>
				</div>
			</Layout>

	);
};

export default Device;