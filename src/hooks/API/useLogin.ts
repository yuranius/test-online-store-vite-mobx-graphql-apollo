import {useMutation} from "@apollo/client";
import {LOGIN} from "../../query/authAPI";
import {IRegistration} from "../../types/queryTypes";
import {useContext} from "react";
import {Context} from "../../main";



export const useLogin = () => {
	const [auth, { data, loading, error}] = useMutation(LOGIN)
	const {user} = useContext(Context)

	const login = ({email, password}:IRegistration) => {
		auth({
			variables:{
				username: email,
				password: password,
			}
		}).then( res => {
				user.setUser({
					objectId: res.data.logIn.viewer.user.objectId,
					role:  res.data.logIn.viewer.user.role,
					username: res.data.logIn.viewer.user.username,
				})
				user.setIsAuth(true)
				localStorage.setItem('token', res.data.logIn.viewer.sessionToken)
		})
	}
	return {login, data, loadingLogin: loading, errorLogin: error}
}