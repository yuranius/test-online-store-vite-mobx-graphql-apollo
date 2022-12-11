export interface IInfoComponent {
	title: string
	description: string
	number: string
}

export interface IOptions {
	value: string
	label: string
}

export interface IError {
	name: string
	type: string
	brand: string
	price: string
	file: string
}

export interface IValuesError {
	name: string
	type: { value: string, label: string}
	brand: { value: string, label: string}
	price: string
	file: File | null
}
