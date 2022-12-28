export interface IDevice {
	id: string
	name: string
	brandId: string,
	typeId: string,
	img: {url: string},
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

export interface IData {
	data: {
		devices: {
			count: number
			edges: any
		}
	}
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
		img: { url: string },
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

export interface INodeRatingDevice {
	node: {
		objectId: string,
		rate: number,
	}
}

export interface INodeDeviceBasket {
	node:{
		objectId: string
		deviceId:{
			img: string
			price:string
			name:string
			objectId: string
		}
	}
}