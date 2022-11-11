import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import React, {createContext, FC, useEffect, useRef, useState} from "react";
import Toasts from "./components/ui/toasts/Toasts";
import {IApp, IRef} from "./types/contextTypes";
import {useQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "./query/authAPI";


// @ts-ignore
export const Context = createContext<IApp>()


const App: FC = () => {

	const {data} = useQuery(GET_LOGGED_USER)
	// setIsAuth может не надо получать из Auth
	const [isAuth , setIsAuth] = useState(false)
	const ref = useRef() as IRef
	

 
	


	useEffect( () => {
		setIsAuth(!!data?.viewer.user)
	}, [data])
	

	return (
			<Context.Provider value={{
				ref: ref,
				isAuth: isAuth,
				setIsAuth: setIsAuth,
			}}>
				<Router>
					<AppRouter/>
					<Toasts ref={ref}/>
				</Router>
			</Context.Provider>

	)
}

export default App
