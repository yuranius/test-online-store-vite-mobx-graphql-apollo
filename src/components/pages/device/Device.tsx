import React, {FC, useContext, useEffect} from 'react';
import styled from './Device.module.scss'
import {useGetDevice} from "../../../hooks/API/useGetDevice";
import {useParams} from "react-router-dom";
import StarRating from "../../ui/StarRating/StarRating";
import {INode} from "../../../types/queryTypes";
import Layout from "../../ui/layout/Layout";
import {format} from "../../../utils/formatter";
import {Context} from "../../../main";
import cn from "classnames";



const Device: FC = () => {
	const {id} = useParams()
	const {device, getDevice} = useGetDevice()
	useEffect(() => {
		getDevice({id})
	}, [])

	const {user} = useContext(Context)


	const changeRating = (newRate: number) => {
		console.log('📌:', newRate, '🌴 🏁')
	}


	return (
			<Layout>
				<div className={styled.wrapper}>
					<div className={styled.container}>
						<div className={styled.image}>
							<img src={device?.img} alt={device?.name}/>
						</div>
						<div className={cn(styled.discription, 'dark:text-blue-100 text-[#6366f1]')}>
							<div className={styled.title}>
								<div className={styled.name}>{device?.name}</div>
								<div className={styled.price}>{ format(device?.price!)}</div>
							</div>
							<div className={cn(styled.rate, 'dark:text-white')}>
								<StarRating rate={device?.rating} changeRating={changeRating}/>
								<div>{device?.rating}</div>
							</div>

							<div className={styled.info}>
								<h1>Характеристики:</h1>
								{device?.info?.map((info:INode, index) =>
										<div key={info.node.objectId} className={index % 2 === 0 ? cn(styled.infoOne, 'bg-gray-200 dark:bg-gray-600') : styled.infoTwo}>
											{info.node.title} - {info.node.description}
										</div>
								)}
							</div>
						</div>
					</div>
					<div className={styled.button}>
						{user.isAuth && <button>Добавить в корзину</button>}
					</div>
				</div>
			</Layout>

	);
};

export default Device;