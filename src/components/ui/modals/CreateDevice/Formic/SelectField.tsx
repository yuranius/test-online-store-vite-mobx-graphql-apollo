import Select from 'react-select'
import {FC} from "react";
import './CustomSelect.scss'
import cn from "classnames";
import {ISelectField} from "../../../../../types/propsTypes";


const SelectField:FC<ISelectField> = ({onChange, options, value, className  }) => {

	let theme = localStorage.getItem('theme')

	const defaultValue = (options:any, value:any) => {
		return (options && value?.value) ? options.find ( (option:any) => option.value == value.value) : {label: 'Выберите...', value: ''}
	}

	//console.log( '📌:value',value,'🌴 🏁')
	

	//console.log( '📌:defaultValue',defaultValue(options, value),'🌴 🏁')
	
	
	return (
			<Select
					value={defaultValue(options, value)}
					onChange={ (value:() => void) => onChange(value)}
					options={options}
					className={cn(className, 'rounded-lg')}
					classNamePrefix={theme === 'light' ? 'custom-select-light' : 'custom-select-dark'}
			/>

	);
};

export default SelectField;