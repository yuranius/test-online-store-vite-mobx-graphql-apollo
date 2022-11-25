import React, {FC, useContext, useState} from 'react';
import styled from './Filter.module.scss'
import SelectField from "../CreateDevice/Formic/SelectField";
import {IFilter, Selected} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import {observer} from "mobx-react-lite";
import '../../navbar/FilterDevices/style.css'
import cn from "classnames";


interface IOptions {
	value: string
	label: string
}

const Filter: FC<IFilter> = observer(({showModal, onShow}) => {

	let selectedOption = (option: Selected[]) => {
		return option?.map(({id, name}) => ({value: id, label: name}))
	}

	const {types, brands} = useGetTypesBrands()
	const {device,user} = useContext(Context)

	const [type, setType] = useState<IOptions>({value: device.selectedType.id, label: device.selectedType.name})
	const [brand, setBrand] = useState<{value: string, label: string}>()


	const handleSubmit = () => {
		if (type?.value) {

			device.setSelectedType(types.find((t: Selected) => t.name === type.label)!)
		}
		if (brand?.value) {
			device.setSelectedBrand(brands.find((b: Selected) => b.name === brand.label)!)
		}
		user.setCurrentPage(1)
		onShow()

	}
	const handleReset = () => {
		setTimeout(() => {
			setType({value: '', label: ''})
			setBrand({value: '', label: ''})
			device.setSelectedBrand({id: '', name: ''})
			device.setSelectedType({id: '', name: ''})
		}, 300)
		onShow()
	}



	let changeType = (value: any) => {
		setType(value)
	}

	let changeBrand = (value: any) => {
		setBrand(value)
	}

	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={cn(styled.container, 'bg-white dark:bg-gray-500')}>
					<SelectField options={selectedOption(types)} value={type} className={''}
					             onChange={changeType}/>
					<SelectField options={selectedOption(brands)} value={brand} className={'mt-3'}
					             onChange={changeBrand}/>
					<div className={styled.button}>
						<button onClick={handleReset} className='text-gray-500 dark:text-white hover:bg-gray-100'>Сброс/Отмена</button>
						<button onClick={handleSubmit} className='text-gray-500 dark:text-white hover:bg-gray-100'>Применить</button>
					</div>
				</div>
			</div>
	);
});

export default Filter;