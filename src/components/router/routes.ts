import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import Admin from "../pages/admin/Admin";
import Basket from "../pages/basket/Basket";
import Auth from "../pages/auth/Auth";
import {IRoute} from "../../types/routerTypes";


export const adminRoutes:IRoute[] = [
	{
		path: ADMIN_ROUTE,
		Page: Admin
	}
]

export const authRoutes:IRoute[] = [
	{
		path: BASKET_ROUTE,
		Page: Basket
	}
]

export const publicRoutes:IRoute[] = [
	{
		path:LOGIN_ROUTE,
		Page: Auth
	},
	{
		path:REGISTRATION_ROUTE,
		Page: Auth
	},
]