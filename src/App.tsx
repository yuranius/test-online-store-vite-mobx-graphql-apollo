import {useQuery} from '@apollo/client'
import React, {FC, useContext, useEffect, useRef} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import AppRouter from './components/router/AppRouter'
import Loader from './components/ui/loader/Loader'
import Toasts from './components/ui/toasts/Toasts'
import {useFetchDeviceBasket} from './hooks/API/useFetchDeviceBasket'
import useDarkMode from './hooks/useDarkMode'
import {Context} from './main'
import {GET_LOGGED_USER} from './query/authAPI'


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
				role: data?.viewer.user?.role,
			})
			fetchDeviceBasket(data?.viewer.user?.objectId).then()
		}
	}, [data])

	return (
		<Router>
			{loading ? <Loader /> : <AppRouter user={user} />}
			<Toasts ref={ref} />
		</Router>
	)
}

export default App