import {IError, IValuesError} from "../types/overTypes";

export const validate = (values: IValuesError) => {
	let errors = {} as IError
	if (!values.name) {
		errors.name = 'Поле должно быть заполнено'
	}

	if (!values.price) {
		errors.price = 'Заполните цену'
	}

	if (isNaN(+values.price)) {
		errors.price = 'Введите число'
	}

	if (!values.type.value) {
		errors.type = 'Тип должен быть выбран'
	}

	if (!values.brand.value) {
		errors.brand = 'Бренд должен быть выбран'
	}

	if (!values.file) {
		errors.file = 'Выберите файл'
	} else if (values.file?.type.split('/')[0] !== 'image') {
		errors.file = 'Файл должен быть изображением'
	}

	return errors
}

export const getError = (formik: any) => {
	return (!!formik.errors.name && !!formik.touched.name) ||
			(!!formik.errors.price && !!formik.touched.price) ||
			(!!formik.errors.type && !!formik.touched.type) ||
			(!!formik.errors.brand && !!formik.touched.brand) ||
			(!!formik.errors.file && !!formik.touched.file)
}


