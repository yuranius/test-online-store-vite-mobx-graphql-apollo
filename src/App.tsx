import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import React, {FC, useContext, useEffect, useRef} from "react";
import Toasts from "./components/ui/toasts/Toasts";
import {useQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "./query/authAPI";
import {Context} from "./main";
import Loader from "./components/ui/loader/Loader";
import useDarkMode from "./hooks/useDarkMode";
import {useFetchDeviceBasket} from "./hooks/API/useFetchDeviceBasket";


const App: FC = () => {
	useDarkMode()

	const {data, loading} = useQuery(GET_LOGGED_USER)

	const {user} = useContext(Context)

	const {fetchDeviceBasket} = useFetchDeviceBasket()

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
			fetchDeviceBasket(data?.viewer.user?.objectId).then()
		}
	}, [data])


	return (
			<Router>
				{loading ? <Loader/>
						: <AppRouter user={user}/>
				}
				<Toasts ref={ref}/>
			</Router>
	)
}

export default App
