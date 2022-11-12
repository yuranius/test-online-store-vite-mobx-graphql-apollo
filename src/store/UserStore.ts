import {makeAutoObservable} from "mobx";

class UserStore {
	private _isAuth: boolean;
	private _user: {
		objectId: string
		username:string
		role: string
	};
	private _ref: undefined;
	private _currentPage: number;


	constructor () {
		this._isAuth = false;
		this._user = {
			role: '',
			username: '',
			objectId: '',
		};
		this._ref = this.ref;
		this._currentPage = 1;
		makeAutoObservable(this)
	}

	setIsAuth ( bool:boolean ) {
		this._isAuth = bool
	}

	setUser (user:{
		objectId: string
		username:string
		role: string
	}) {
		this._user = user
	}

	setRef (ref: undefined) {
		this._ref = ref
	}

	setCurrentPage(page: number) {
		this._currentPage = page
	}

	get isAuth () {
		return this._isAuth
	}

	get user () {
		return this._user
	}

	get ref () {
		return this._ref
	}

	get currentPage () {
		return this._currentPage
	}
}


export default UserStore;