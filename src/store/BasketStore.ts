import {makeAutoObservable} from "mobx";

class BasketStore {
	private _quantity: number;

	constructor() {
		this._quantity = 0
		makeAutoObservable(this)
	}


	addQuantityDevices () {
		this._quantity ++
	}

	deleteQuantityDevices () {
		this._quantity --
	}

	setQuantityDevices (devices: number) {
		this._quantity = devices
	}

	get quantityDevices() {
		return this._quantity
	}
}

export default BasketStore;