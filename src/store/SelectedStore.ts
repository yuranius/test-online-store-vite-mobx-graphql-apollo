import {makeAutoObservable} from "mobx";
import {Selected} from "../types/propsTypes";
import {ISelectedRate} from "../types/contextTypes";


class SelectedStore {
	private _selectedType: Selected
	private _selectedBrand: Selected
	private _selectedRate: ISelectedRate

	constructor() {

		this._selectedType = {id: '' , name: ''}
		this._selectedBrand = {id: '' , name: ''}
		this._selectedRate = {id: '', rate: null}

		makeAutoObservable(this)
	}

	setSelectedType (type: Selected) {
		this._selectedType = type
	}

	setSelectedBrand (type: Selected) {
		this._selectedBrand = type
	}

	setSelectedRate (rate: ISelectedRate) {
		this._selectedRate = rate
	}

	get selectedType () {
		return this._selectedType
	}

	get selectedBrand () {
		return this._selectedBrand
	}

	get selectedRate () {
		return this._selectedRate
	}

}


export default SelectedStore;