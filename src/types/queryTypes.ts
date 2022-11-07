export interface IDevice {
	id: string
	name: string
	brandId: string,
	typeId: string,
	img: string,
	rating: string,
	price: string,
}

export interface IRegistration {
	email: string
	password: string
}