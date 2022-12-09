import {useMutation} from "@apollo/client";
import {LOGOUT_USER} from "../query/authAPI";
import {SHOP_ROUTE} from "../utils/consts";
import {useContext} from "react";
import {Context} from "../main";
import {useLocation, useNavigate} from "react-router-dom";


export const useLogoutUser = () => {

	const {user} = useContext(Context)
	const locate = useLocation()
	const navigate = useNavigate()

	const [logoutUser, {error}] = useMutation(LOGOUT_USER, {
		variables: {
			id: user.user.objectId
		}
	})


	const logout = () => {
		logoutUser().then(({data}) => {
			if (data.logOut.ok) {
				localStorage.clear()
				user.setIsAuth(false)
				user.setUser({objectId: '', role: '', username: ''})
				if (locate.pathname !== '/') {
					navigate(SHOP_ROUTE)
				}
			}
		})
	}

	return {logout, error}
}