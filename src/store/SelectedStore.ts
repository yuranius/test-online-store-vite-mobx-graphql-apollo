import {makeAutoObservable} from "mobx";
import {Selected} from "../types/propsTypes";
import {ISelectedRate} from "../types/contextTypes";


class SelectedStore {
	private _selectedType: Selected
	private _selectedBrand: Selected
	private readonly _limit: number
	private readonly _partitionSize: number

	constructor() {
		this._selectedType = {id: '' , name: ''}
		this._selectedBrand = {id: '' , name: ''}
		this._limit = 9
		this._partitionSize = 5

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

	get limit () {
		return this._limit
	}

	get partitionSize () {
		return this._partitionSize
	}


}


export default SelectedStore;