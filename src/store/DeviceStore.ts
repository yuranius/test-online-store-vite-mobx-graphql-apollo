import {makeAutoObservable} from "mobx";


class DeviceStore {
	private _selectedType: object
	private _selectedBrand: object

	constructor() {

		this._selectedType = {}
		this._selectedBrand = {}

		makeAutoObservable(this)
	}

	setSelectedType (type: object) {
		this._selectedType = type
	}

	setSelectedBrand (type: object) {
		this._selectedBrand = type
	}

	get selectedType () {
		return this._selectedType
	}

	get selectedBrand () {
		return this._selectedBrand
	}

}


export default DeviceStore;