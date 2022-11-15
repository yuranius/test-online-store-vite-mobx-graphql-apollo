export interface IDevice {
	id: string
	name: string
	brandId: string,
	typeId: string,
	img: string,
	rating: number,
	price: number,
	info?: Array<INodeInfo>
}

export interface INodeInfo {
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


export type FetchDevice = {
	limit: number
	skip: number
	typeId?: string
	brandId?: string
}

export interface INodeDevice {
	node:{
		objectId: string,
		name: string,
		brandId: {
			objectId: string
		},
		typeId: {
			objectId: string
		},
		img: string,
		rating: number,
		price: number,
	}
}


export interface INodeTypeBrand {
	node: {
		objectId: string,
		name: string,
	}
}