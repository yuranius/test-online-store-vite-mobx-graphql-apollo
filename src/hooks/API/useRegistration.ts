import {useMutation} from "@apollo/client";
import {CREATE_BASKET, REGISTRATION} from "../../query/authAPI";
import {IRegistration} from "../../types/queryTypes";

export const useRegistration = () => {
	const [regUser, {data: user, loading: loadingReg, error: errorReg}] = useMutation(REGISTRATION)
	const [createBasket, {data: basket, loading: loadingBasket, error: errorBasket}] = useMutation(CREATE_BASKET)

	const registration = ({email, password}:IRegistration) => {
		regUser({
			variables: {
				email: email,
				password: password,
				username: email,
				role: 'USER',
			}
		}).then( user => createBasket( {
			variables:{
				userId: user.data.signUp.viewer.user.objectId
			}
		}))
	}
	
	let loadingRegistration = loadingReg || loadingBasket
	let errorRegistration = errorReg?.message || errorBasket?.message

	return {registration, loadingRegistration, basket, errorRegistration}

}