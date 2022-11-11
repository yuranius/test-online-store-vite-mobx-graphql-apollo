export interface IDevices {
	id: string
	name: string
	brandId: string,
	typeId: string,
	img: string,
	rating: string,
	price: string,
	info?: []
}

export interface IRegistration {
	email: string
	password: string
}