import React, {FC, useState} from 'react';
import styled from './Form.module.scss'
import {IFormCreateDevice} from "../../../../../types/propsTypes";
import {observer} from "mobx-react-lite";
import {uuid} from "../../../../../utils/uuid";

interface IInfo {
	number: string
	title: string
	description: string
}

const Form:FC<IFormCreateDevice> = observer((props) => {

	const [info, setInfo] = useState<Array<IInfo>>([])

	const {device, types, brands } = props
	let testFunction = (e:any) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement);
		console.log( '📌:',(formData.get('types')), (formData.get('file')), '🌴 🏁')
		;
	}

	console.log( '📌:',info,'🌴 🏁')

	const addInfo = () => {
		setInfo([...info,{title:'', description:'', number: uuid()}])
	}

	const changeInfo = (key: string, value: string, number: string) => {
		setInfo(info.map( i => i.number === number ? {...i, [key]: value} : i))
	}

	const deleteInfo = (number: string) => {
		setInfo(info.filter( i => i.number !== number))
	}

	return (
			<form onSubmit={testFunction} className={styled.form}>
				<div className={styled.select}>
					<select name='types' className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option defaultValue={device.selectedType.name}>Выберите тип</option>
						{types.map((type) => <option key={type.id}  value={type.name} onClick={() => device.setSelectedType(type)}>{type.name}</option>)}
					</select>
				</div>
				<div className={styled.select}>
					<select name='barnds' className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option defaultValue={device.selectedBrand.name}>Выберите бренд</option>
						{brands.map((brand) => <option key={brand.id}  value={brand.name} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</option>)}
					</select>
				</div>

				<div className='flex flex-col'>
					<label/> Введите название устройства
					<input type='text' name="name" />
				</div>
				<div className='flex flex-col'>
					<label/> Введите cтоимость устройства
					<input type='text' name="price" />
				</div>
				<div className='flex flex-col'>
					<label/> Выберите файл
					<input type='file' name="file" />
				</div>

				<hr />

				<button onClick={addInfo}>Добавить новое свойство</button>
				{info.map( i =>
						<div key={i.number} className='mt-3'>
							<div>
								<input
										value={i.title}
										placeholder='Введите название характеристики'
										onChange={(e) => changeInfo('title', e.target.value, i.number)}
								/>
							</div>
							<div>
								<input
										value={i.description}
										placeholder='Введите описание характеристики'
										onChange={(e) => changeInfo('description', e.target.value, i.number)}
								/>
							</div>
							<div>
								<button onClick={() => deleteInfo(i.number)}>Удалить</button>
							</div>
						</div>
				)}
				<button>Отправить</button>
			</form>
	);
});

export default Form;