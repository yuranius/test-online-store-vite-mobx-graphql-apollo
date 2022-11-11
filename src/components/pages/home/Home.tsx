import React, {FC, useEffect} from 'react';
import Layout from "../../ui/layout/Layout";
import {useGetDevices} from "../../../hooks/API/useGetDevices";
import DeviceItem from "../../ui/device-item/DeviceItem";
import {IDevice} from "../../../types/queryTypes";
import styled from './Home.module.scss'

const Home: FC = () => {


	const {fetchDevice, devices, loading, count} = useGetDevices()


	useEffect(() => {
		fetchDevice({limit: 8, skip: 0})
	}, [])


	return (
			<Layout>
				<div className='text-sky-500 mt-5'>
					{loading
							? <div>LOADING....</div>
							: devices?.length
									? (<div className={styled.wrapper}>
										{devices?.length && devices.map((device: IDevice) => (
												<DeviceItem key={device.id} device={device}/>))}
									</div>)
									: <div className='text-red-400'>Товары не найдены!</div>
					}
				</div>
			</Layout>
	);
};

export default Home;