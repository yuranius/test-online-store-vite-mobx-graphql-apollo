export interface IShippingFields {
	email: string
	name: string
	address: IAddress
}


export interface IAddress {
	country: string
	city: string
	street: string
	house: string
}