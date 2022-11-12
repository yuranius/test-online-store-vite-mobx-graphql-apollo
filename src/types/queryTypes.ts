export interface IDevices {
	id: string
	name: string
	brandId: string,
	typeId: string,
	img: string,
	rating: number,
	price: number,
	info?: Array<INode>
}

export interface INode {
	node: IInfo
}

export interface IInfo {
	objectId: string
	title: string
	description: string
}

export interface IRegistration {
	email: string
	password: string
}