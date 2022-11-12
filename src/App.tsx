import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import React, {FC, useContext, useEffect, useRef} from "react";
import Toasts from "./components/ui/toasts/Toasts";
import {useQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "./query/authAPI";
import {Context} from "./main";

const App: FC = () => {

	const {data} = useQuery(GET_LOGGED_USER)

	const {user} = useContext(Context)

	const ref = useRef()
	user.setRef(ref)

	useEffect(() => {
		if (data?.viewer.user) {
			user.setIsAuth(true)
			user.setUser({
				objectId: data?.viewer.user?.objectId,
				username: data?.viewer.user?.username,
				role: data?.viewer.user?.role
			})
		}

		console.log( '📌:APP',user.isAuth, user.user.role,'🌴 🏁')
	}, [data])




	return (
			<Router>
				<AppRouter isAuth={user.isAuth} role={user.user.role}/>
				<Toasts ref={ref}/>
			</Router>


	)
}

export default App
