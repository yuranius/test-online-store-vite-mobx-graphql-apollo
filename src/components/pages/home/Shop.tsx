import React, {FC, memo, useContext, useEffect, useState} from 'react';
import Layout from "../../ui/layout/Layout";
import {useGetDevices} from "../../../hooks/API/useGetDevices";
import DeviceItem from "../../ui/device-item/DeviceItem";
import styled from './Shop.module.scss'
import Pagination from "../../ui/padination/Pagination";
import {Context} from "../../../main";
import {observer} from "mobx-react-lite";
import {FetchDevice, IDevice} from "../../../types/queryTypes";

const Shop: FC = observer(() => {

	const [devices, setDevices] = useState([])
	const [count, setCount] = useState(0)

	const {user, selected} = useContext(Context)
	const skip = user.currentPage * selected.limit - selected.limit

	const {fetchDevice, loading} = useGetDevices()

	async function fetchDevicesHandler ({limit, skip, brandId, typeId}:FetchDevice) {
		const {devices, count} = await fetchDevice({limit, skip , brandId, typeId})
		setDevices(devices)
		setCount(count)
	}

	useEffect(() => {
		fetchDevicesHandler({limit: selected.limit, skip})
	}, [])

	let changePage = (page: number) => {
		user.setCurrentPage(page)
	}

	useEffect ( () => {
		fetchDevicesHandler({limit: selected.limit, skip, brandId: selected.selectedBrand.id, typeId: selected.selectedType.id})
	},[selected.selectedBrand, selected.selectedType, user.currentPage])

	
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
				<Pagination total={count} limit={selected.limit} currentPage={user.currentPage} changePage={changePage} portionSize={selected.partitionSize} />
			</Layout>
	);
});

export default Shop;