import cn from 'classnames'
import React, {FC, ForwardedRef, forwardRef, useContext, useState} from 'react'

import {IconSetting} from '../../icon/Icon'
import styled from './Filter.module.scss'
import SelectField from "../../modals/CreateDevice/Formic/SelectField";
import {IToasts, Selected} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import {IOptions} from "../../../../types/overTypes";
import Button from "../../button/Button";


const FilterBurgerMenu: FC<IToasts> = forwardRef(({}, ref) => {
	const [rotate, setRotate] = useState(false)
	const showSelect = () => {
		setRotate(!rotate)
	}


	let selectedOption = (option: Selected[]) => {
		return option?.map(({id, name}) => ({value: id, label: name}))
	}

	const {types, brands} = useGetTypesBrands()
	const {selected, user} = useContext(Context)

	const [type, setType] = useState<IOptions>({value: selected.selectedType.id, label: selected.selectedType.name})
	const [brand, setBrand] = useState<IOptions>({value: selected.selectedBrand.id, label: selected.selectedBrand.name})


	const handleSubmit = () => {
		if (type?.value) {
			selected.setSelectedType(types.find((t: Selected) => t.name === type.label)!)
		}
		if (brand?.value) {
			selected.setSelectedBrand(brands.find((b: Selected) => b.name === brand.label)!)
		}
		user.setCurrentPage(1)
	}
	const handleReset = () => {
		setTimeout(() => {
			setType({value: '', label: ''})
			setBrand({value: '', label: ''})
			selected.setSelectedBrand({id: '', name: ''})
			selected.setSelectedType({id: '', name: ''})
		}, 300)
		user.setCurrentPage(1)
	}

	let changeType = (value: any) => {
		setType(value)
	}

	let changeBrand = (value: any) => {
		setBrand(value)
	}

	const styleButton = 'text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-400'


	return (
			<div className={styled.wrapper}>
				<div className={cn(styled.switchButton, rotate ? 'rotate-90' : 'rotate-0')} onClick={showSelect}>
					<IconSetting/>
				</div>
				<div className={cn(styled.filter, rotate ? 'h-36' : 'h-0 overflow-hidden')}>
					<SelectField options={selectedOption(types)} value={type} className={''} onChange={changeType}/>
					<SelectField options={selectedOption(brands)} value={brand} className={'text-gray-100'} onChange={changeBrand}/>
					<div className={styled.button}>
						<Button onClick={handleReset} className={styleButton}>Сброс/Отмена</Button>
						<Button onClick={handleSubmit} className={styleButton}>Применить</Button>
					</div>
				</div>
			</div>
	)
})

export default FilterBurgerMenu