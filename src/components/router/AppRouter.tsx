import React, {FC, useContext} from 'react';
import {adminRoutes, authRoutes, publicRoutes} from "./routes";
import {Route, Routes} from "react-router-dom";
import {Context} from "../../main";
import {observer} from "mobx-react-lite";


const AppRouter: FC = observer(() => {
	//const {user} = useContext(Context)

	const user = {isAuth: true, user: {role: 'ADMIN'}}

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
				{/*Роут на компоненты для пользователей*/}
				{publicRoutes.map(({path, Page}) =>
						<Route key={path} path={path} element={<Page/>}/>
				)}
			</Routes>
	);
});

export default AppRouter;