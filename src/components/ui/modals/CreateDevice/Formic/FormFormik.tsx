import React, {FC, useEffect, useState} from 'react';
import {useFormik} from "formik";
import {IFormCreateDevice, Selected} from "../../../../../types/propsTypes";
import SelectField from "./SelectField";
import cn from "classnames";
import styled from './FormFormik.module.scss'
import {useMessageContext} from "../../../../../hooks/useMessageContext";
import {WARNING} from "../../../../../utils/consts";
import {getError, validate} from "../../../../../utils/formik";
import {IInfoComponent} from "../../../../../types/overTypes";


interface IOption {
	label: string
	value: string
}


const FormFormik: FC<IFormCreateDevice> = (props) => {

	const [info, setInfo] = useState<IInfoComponent[]>([])

	const {types, brands, showModal, onHide} = props

	const {showMessage} = useMessageContext()

	const addInfo = () => {
		setInfo([...info, {title: '', description: '', number: Date.now()}])
	}
	const deleteInfo = (number: number) => {
		setInfo(info.filter(i => i.number !== number))
	}

	const changeInfo = (key: string, value: string, number: number) => {
		setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
	}

	// const onSubmit = (value: any) => {
	// 	device.setSelectedType(types.find((type: Selected) => type.name === value.label)!)
	// }

	let selectedOption = (option: Selected[]) => {
		return option?.map(({id, name}) => ({value: id, label: name}))
	}


	const formik = useFormik({
		initialValues: {
			name: '',
			type: '',
			brand: '',
			price: '',
			file: null
		},
		onSubmit: (values, formikHelpers) => {
			console.log('📌:Submit', values, '🌴 🏁')
		},
		validate,
	})

	useEffect(() => {
		if (!showModal) {
			formik.resetForm()
			formik.setErrors({price: '', brand: '', type: '', name: ''})
		}
	}, [showModal])


	const error = getError(formik)


	useEffect(() => {
		if (error) {
			showMessage({text: 'Ошибка заполнения формы', typeIcon: WARNING})
		}
	}, [error])

	// const checkError = (validationField: string) => {
	// 	return formik.errors
	// }


	return (
			<div className='w-11/12 m-auto'>

				<form className='flex flex-col my-2' onSubmit={formik.handleSubmit}>


					<div className='relative'>
						<label htmlFor='name' className='text-gray-500 dark:text-indigo-100'>Название устройства</label>
						<input
								type="text"
								name='name'
								onChange={formik.handleChange}
								className={cn(styled.input, 'focus:border-[#6366f1] dark:focus:border-white dark:bg-inherit dark:text-indigo-100',
										formik.errors.name && formik.touched.name && 'rounded-xl border-4 border-red-700')}
								value={formik.values.name}
						/>
						{formik.errors.name && formik.touched.name && <span className={styled.after}>!</span>}
					</div>
					{formik.errors.name && formik.touched.name && <div className='text-red-300'>{formik.errors.name}</div>}

					<div className='relative mt-4'>
						<label htmlFor='price' className='text-gray-500 dark:text-indigo-100'>Цена устройства</label>
						<input
								type="text"
								name='price'
								onChange={formik.handleChange}
								className={cn(styled.input, 'focus:border-[#6366f1] dark:focus:border-white dark:bg-inherit dark:text-indigo-100',
										formik.errors.price && formik.touched.price && 'rounded-xl border-4 border-red-700')}
								value={formik.values.price}
						/>
						{formik.errors.price && formik.touched.price && <span className={styled.after}>!</span>}
					</div>
					{formik.errors.price && formik.touched.price && <div className='text-red-300'>{formik.errors.price}</div>}


					<div className={styled.selectedWrapper}>
						<div className={styled.selected}>
							<label htmlFor='type' className='text-gray-500 dark:text-indigo-100'>Тип</label>
							<SelectField
									options={selectedOption(types)}
									value={formik.values.type}
									className={formik.errors.type && formik.touched.type && 'rounded-xl border-4 border-red-700'}
									onChange={(value: any) => formik.setFieldValue('type', value.value)}
							/>
							{formik.errors.type && formik.touched.type && <div className='text-red-300'>{formik.errors.type}</div>}
						</div>

						<div className={styled.selected}>
							<label htmlFor='brand' className='text-gray-500 dark:text-indigo-100'>Бренд</label>
							<SelectField
									options={selectedOption(brands)}
									value={formik.values.brand}
									className={formik.errors.brand && formik.touched.brand && 'rounded-xl border-4 border-red-700'}
									onChange={(value: any) => formik.setFieldValue('brand', value.value)}
							/>
							{formik.errors.brand && formik.touched.brand && <div className='text-red-300'>{formik.errors.brand}</div>}
						</div>

					</div>

					<div className='relative mt-4'>
						<label htmlFor='file' className='text-gray-500 dark:text-indigo-100'>Цена устройства</label>
						<input
								type="file"
								name='file'
								onChange={(e) => formik.setFieldValue('file', e?.target.files![0])}
								className={cn(styled.input, 'focus:border-[#6366f1] dark:focus:border-white dark:bg-inherit dark:text-indigo-100',
										formik.errors.file && formik.touched.file && 'rounded-xl border-4 border-red-700')}
						/>
						{formik.errors.file && formik.touched.file && <span className={styled.after}>!</span>}
					</div>
					{formik.errors.file && formik.touched.file && <div className='text-red-300'>{formik.errors.file}</div>}

					<hr className='my-4'/>
					<button onClick={addInfo} type='button' className={cn(styled.addButton, 'bg-teal-600')}>Добавить свойство
					</button>
					{info.map(i =>
							<div key={i.number} className={styled.blockInfo}>

								<input
										type="text"
										placeholder='Название характристики'
										value={i.title}
										onChange={(e) => changeInfo('title', e.target.value, i.number)}
										className={cn(styled.input, 'focus:border-[#6366f1] dark:focus:border-white dark:bg-inherit dark:text-indigo-100')}
								/>

								<input
										type="text"
										placeholder='Описание характристики'
										value={i.description}
										onChange={(e) => changeInfo('description', e.target.value, i.number)}
										className={cn(styled.input, 'focus:border-[#6366f1] dark:focus:border-white dark:bg-inherit dark:text-indigo-100')}

								/>
								<button
										onClick={() => deleteInfo(i.number)}
										type='button'
										className={styled.deleteButton}
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									     xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
									</svg>
								</button>
							</div>
					)}

					<div className={styled.footer}>
						<button type='button' className={styled.closeButton} onClick={onHide}>Закрыть</button>
						<button type='submit' className={styled.saveButton}>Сохранить</button>
					</div>
				</form>

			</div>

	);
};

export default FormFormik;