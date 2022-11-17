import React, {FC} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IShippingFields} from "./interface";
import {useMessageContext} from "../../../../../hooks/useMessageContext";
import {DANGER, SUCCESS} from "../../../../../utils/consts";
import ReactSelect from 'react-select'
import {IFormCreateDevice} from "../../../../../types/propsTypes";

interface IOption {
	value: string
	label:string
}


const options:IOption[] = [{
	value: 'russia',
	label: 'Russia'
}, {
	value: 'china',
	label: 'China'
}, {
	value: 'mexico',
	label: 'Mexico'
}, {
	value: 'tunis',
	label: 'Tunis'
}
]



const NewForm: FC<IFormCreateDevice> = (props) => {

	const {register, handleSubmit, formState: {errors}, reset, control} = useForm<IShippingFields>({mode: 'onSubmit'})

	const {device, types, brands} = props



	const {showMessage} = useMessageContext()

	const onSubmit: SubmitHandler<IShippingFields> = (data) => {
		alert(`Your name ${data.name}`)
		showMessage({text: `${data.name}, ${data.email}, ${{data}}`, typeIcon: SUCCESS})
		reset()
	}

	const getValue = (value: { }):void => {
		console.log( '📌:',value,'🌴 🏁')
		
		value ? options.find((option) => option.value === value) : ''
	}

	let test: any;

	if (types) {
		test = types.map( ({id, name}) => ({value: id, label: name}))
	}









	// if (!!errors.name) {
	// 	showMessage({text: `${errors.name?.message}`, typeIcon: DANGER})
	//
	// } else if (!!errors.email) {
	// 	showMessage({text: `${errors.email?.message}`, typeIcon: DANGER})
	// }
	

	

	return (
			<div>

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
					<input {...register('name', {required: 'Введите имя'})} type="text"/>
					<input {...register('email', {required: 'Введите email'})} type="text"/>

					<Controller
							name={'address.country'}
							control={control}
							rules={{
								required:'Country is require!'
							}}
							render={({ field: {onChange, value}, fieldState:{error}, formState }) =>
							<>
								<ReactSelect
										options={types}
										placeholder='Countries'
										value={getValue(value)}
										onChange={(newValue) => onChange(newValue)}
								/>
								{error && showMessage({text: `${error.message}`, typeIcon: DANGER})}
							</>

					}

					/>



					<button>Send</button>
				</form>
			</div>
	);
};

export default NewForm;