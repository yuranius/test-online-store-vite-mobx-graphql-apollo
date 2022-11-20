
interface IError {
	name: string
	type: string
	brand: string
	price: string
	file: string
}

export const validate = (values: { name: string, type: {}, brand: {}, price: string, file: File | null }) => {
	let errors = {} as IError
	if (!values.name) {
		errors.name = 'Поле должно быть заполнено'
	}

	if (!values.price) {
		errors.price = 'Тип должен быть выбран'
	}

	if (isNaN(+values.price)) {
		errors.price = 'Введите число'
	}

	if (!values.type) {
		errors.type = 'Тип должен быть выбран'
	}

	if (!values.brand) {
		errors.brand = 'Бренд должен быть выбран'
	}

	if (!values.file ) {
		errors.file = 'Выберите файл'
	} else if (values.file?.type.split('/')[0] !== 'image') {
		errors.file = 'Файл должен быть изображением'
	}

	return errors
}


export const getError = (formik:any) => {
	return (!!formik.errors.name && !!formik.touched.name) ||
	(!!formik.errors.price && !!formik.touched.price) ||
	(!!formik.errors.type && !!formik.touched.type) ||
	(!!formik.errors.brand && !!formik.touched.brand) ||
	(!!formik.errors.file && !!formik.touched.file)
}


