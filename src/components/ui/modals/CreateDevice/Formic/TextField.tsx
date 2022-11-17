import React, {FC} from 'react';
import {useField} from "formik";

interface TextField {
	label: string
	name: string
	type: string
}


const TextField:FC<TextField> = (props) => {

	const {label} = props

	const [field, meta] = useField(props)

	

	return (
			<div className='mb-2'>
				<label htmlFor={field.name}>{label}</label>
				<input
						className='shadow-2xl form'
						{...field} {...props}
						autoComplete='off'
				/>
			</div>
	);
};

export default TextField;