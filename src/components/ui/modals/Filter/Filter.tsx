import React, {FC, useContext} from 'react';
import styled from './Filter.module.scss'
import SelectField from "../CreateDevice/Formic/SelectField";
import {Selected} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import {observer} from "mobx-react-lite";
import '../../navbar/FilterDevices/style.css'


const Filter: FC = observer(() => {


	const {types, brands} = useGetTypesBrands()
	const {device} = useContext(Context)


	let selectedOption = (option: Selected[]) => {
		return option?.map(({id, name}) => ({value: id, label: name}))
	}

	let changeType = (el: any) => {
		device.setSelectedType(types.find((type: Selected) => type.name === el.label)!)
	}

	let changeBrand = (el: any) => {
		device.setSelectedBrand(brands.find((brand: Selected) => brand.name === el.label)!)
	}

	return (
			<div className={styled.wrapper}>
				<SelectField options={selectedOption(types)} value={device} className={'bg-rose-300'} onChange={changeType}/>
				<SelectField options={selectedOption(brands)} value={device.selectedBrand} className={'bg-sky-400'}
				             onChange={changeBrand}/>
			</div>
	);
});

export default Filter;