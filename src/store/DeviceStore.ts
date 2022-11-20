import {makeAutoObservable} from "mobx";
import {Selected} from "../types/propsTypes";


class DeviceStore {
	private _selectedType: Selected
	private _selectedBrand: Selected

	constructor() {

		this._selectedType = {id: '' , name: ''}
		this._selectedBrand = {id: '' , name: ''}

		makeAutoObservable(this)
	}

	setSelectedType (type: Selected) {
		this._selectedType = type
	}

	setSelectedBrand (type: Selected) {
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