import React, {FC, memo, useContext, useEffect} from 'react';
import Layout from "../../ui/layout/Layout";
import {useGetDevices} from "../../../hooks/API/useGetDevices";
import DeviceItem from "../../ui/device-item/DeviceItem";
import styled from './Shop.module.scss'
import Pagination from "../../ui/padination/Pagination";
import {Context} from "../../../main";
import {observer} from "mobx-react-lite";
import {IDevice} from "../../../types/queryTypes";

const Shop: FC = observer(() => {

	const {user, selected} = useContext(Context)
	const skip = user.currentPage * selected.limit - selected.limit

	const {fetchDevice, devices, loading, count} = useGetDevices()

	useEffect(() => {
		fetchDevice({limit: selected.limit, skip})
	}, [])

	let changePage = (page: number) => {
		user.setCurrentPage(page)
	}

	useEffect ( () => {
		fetchDevice({
			limit: selected.limit,
			skip,
			brandId: selected.selectedBrand.id,
			typeId:selected.selectedType.id
		})
		
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