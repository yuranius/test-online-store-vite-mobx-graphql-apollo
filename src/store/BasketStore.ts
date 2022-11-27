import {makeAutoObservable} from "mobx";

class BasketStore {
	private _quantity: number

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

	get quantityDevices() {
		return this._quantity
	}
}

export default BasketStore;