import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import React, {createContext, FC, useRef} from "react";
import Toasts from "./components/ui/toasts/Toasts";
import {IRef} from "./types/contextTypes";


export const Context = createContext<IRef | null>(null)


const App: FC = () => {

	const ref = useRef() as IRef

	return (
			<Context.Provider value={ref}>
				<Router>
					<AppRouter/>
					<Toasts ref={ref}/>
				</Router>
			</Context.Provider>

	)
}

export default App
