import React, {FC, FunctionComponent} from 'react';
import {publicRoutes} from "./routes";
import {Route, Routes} from "react-router-dom";
import {IRoute} from "../../types/routerTypes";


const AppRouter:FC = () => {


	return (
			<Routes>
				{publicRoutes.map( ({path, Page}:IRoute) =>
					<Route key={path} path={path} element={<Page />}/>
				)}
			</Routes>
	);
};

export default AppRouter;