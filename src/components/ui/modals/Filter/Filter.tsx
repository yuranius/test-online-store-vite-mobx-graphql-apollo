import React, {FC, useContext, useEffect, useState} from 'react';
import styled from './Filter.module.scss'
import SelectField from "../CreateDevice/Formic/SelectField";
import {IFilter, Selected} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import {observer} from "mobx-react-lite";
import '../../navbar/FilterDevices/style.css'
import cn from "classnames";


const Filter: FC<IFilter> = observer(({showModal, onShow}) => {


	const {types, brands} = useGetTypesBrands()
	const {device} = useContext(Context)

	const [type, setType] = useState<Selected>()
	const [brand, setBrand] = useState<Selected>()


const  handleButton = () => {
		if(type){
			device.setSelectedType(type)
		}
		if(brand){
			device.setSelectedBrand(brand)
		}
	onShow()
}


	let selectedOption = (option: Selected[]) => {
		return option?.map(({id, name}) => ({value: id, label: name}))
	}

	let changeType = (el: any) => {
		setType(types.find((type: Selected) => type.name === el.label)!)
	}

	let changeBrand = (el: any) => {
		setBrand(brands.find((brand: Selected) => brand.name === el.label)!)
	}

	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={styled.container}>
					<SelectField options={selectedOption(types)} value={device} className={'bg-rose-300'} onChange={changeType}/>
					<SelectField options={selectedOption(brands)} value={device} className={'bg-sky-400 mt-3'}
					             onChange={changeBrand}/>
					<div className={styled.button}>
						<button onClick={() => onShow()	}>Отмена</button>
						<button onClick={handleButton}>Применить</button>
					</div>
				</div>
			</div>
	);
});

export default Filter;