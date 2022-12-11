import React, {FC, useContext, useState} from 'react';
import styled from './Filter.module.scss'
import SelectField from "../CreateDevice/Formic/SelectField";
import {IModalFilterRating, Selected} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import {observer} from "mobx-react-lite";
import '../../navbar/FilterDevices/style.css'
import cn from "classnames";
import { IOptions } from '../../../../types/overTypes';



const Filter: FC<IModalFilterRating> = observer(({showModal, onShow}) => {

	let selectedOption = (option: Selected[]) => {
		return option?.map(({id, name}) => ({value: id, label: name}))
	}

	const {types, brands} = useGetTypesBrands()
	const {selected,user} = useContext(Context)

	const [type, setType] = useState<IOptions>({value: selected.selectedType.id, label: selected.selectedType.name})
	const [brand, setBrand] = useState<{value: string, label: string}>()


	const handleSubmit = () => {
		if (type?.value) {

			selected.setSelectedType(types.find((t: Selected) => t.name === type.label)!)
		}
		if (brand?.value) {
			selected.setSelectedBrand(brands.find((b: Selected) => b.name === brand.label)!)
		}
		user.setCurrentPage(1)
		onShow()

	}
	const handleReset = () => {
		setTimeout(() => {
			setType({value: '', label: ''})
			setBrand({value: '', label: ''})
			selected.setSelectedBrand({id: '', name: ''})
			selected.setSelectedType({id: '', name: ''})
		}, 300)
		user.setCurrentPage(1)
		onShow()
	}

	let changeType = (value: any) => {
		setType(value)
	}

	let changeBrand = (value: any) => {
		setBrand(value)
	}

	const styleButton = 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-400'

	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={cn(styled.container, 'bg-white dark:bg-gray-500')}>
					<SelectField options={selectedOption(types)} value={type} className={''} onChange={changeType}/>
					<SelectField options={selectedOption(brands)} value={brand} className={'mt-3 text-gray-100'}
					             onChange={changeBrand}/>
					<div className={styled.button}>
						<button onClick={handleReset} className={styleButton}>Сброс/Отмена</button>
						<button onClick={handleSubmit} className={styleButton}>Применить</button>
					</div>
				</div>
			</div>
	);
});

export default Filter;