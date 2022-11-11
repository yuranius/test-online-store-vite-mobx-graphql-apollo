import {useMutation} from "@apollo/client";
import {LOGIN} from "../../query/authAPI";
import {IRegistration} from "../../types/queryTypes";
import {useContext} from "react";
import {Context} from "../../App";


export const useLogin = () => {
	const [auth, { data, loading, error}] = useMutation(LOGIN)
	const {setIsAuth} = useContext(Context)

	const login = ({email, password}:IRegistration) => {
		auth({
			variables:{
				username: email,
				password: password,
			}
		}).then( res => {
				localStorage.setItem('token', res.data.logIn.viewer.sessionToken)
				setIsAuth(true)
		})
	}
	return {login, user: data, loadingLogin: loading, errorLogin: error}
}