import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import Admin from "../pages/admin/Admin";
import Basket from "../pages/basket/Basket";
import Auth from "../pages/auth/Auth";
import {IRoute} from "../../types/routerTypes";
import Home from "../pages/home/Home";
import Device from "../pages/device/Device";


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
	{
		path:SHOP_ROUTE,
		Page: Home
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Page: Device
	}
]