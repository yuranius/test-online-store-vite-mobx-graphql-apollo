import React, {FC, useEffect} from 'react';
import {useFormik} from "formik";
import {IFormCreateDevice, Selected} from "../../../../../types/propsTypes";
import SelectField from "./SelectField";
import cn from "classnames";
import styled from './FormFormik.module.scss'
import {useMessageContext} from "../../../../../hooks/useMessageContext";
import {WARNING} from "../../../../../utils/consts";
import {getError, validate} from "../../../../../utils/formik";



interface IOption {
	label: string
	value: string
}




const FormFormik: FC<IFormCreateDevice> = (props) => {


	const {types, brands, showModal, onHide} = props

	const {showMessage} = useMessageContext()


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

					<div className={styled.footer}>
						<button type='button' className={styled.closeButton} onClick={onHide}>Закрыть</button>
						<button type='submit' className={styled.saveButton} >Сохранить</button>
					</div>
				</form>

			</div>

	);
};

export default FormFormik;