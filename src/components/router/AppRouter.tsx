import React, {FC} from 'react';
import {adminRoutes, authRoutes, publicRoutes} from "./routes";
import {Route, Routes} from "react-router-dom";



const AppRouter: FC<any> = ({user}) => {


	return (
			<Routes>
				{/*Роуты на компоненты для авторизированных пользователей*/}
				{user.isAuth && authRoutes.map(({path, Page}) =>
						<Route key={path} path={path} element={<Page/>}/>
				)}
				{/*Роуты на компоненты для пользователей с ролью администратор*/}
				{user.user.role === 'ADMIN' && adminRoutes.map(({path, Page}) =>
						<Route key={path} path={path} element={<Page/>}/>
				)}
				{/*Роуты на компоненты для пользователей*/}
				{publicRoutes.map(({path, Page}) =>
						<Route key={path} path={path} element={<Page/>}/>
				)}
			</Routes>
	);
};

export default AppRouter;