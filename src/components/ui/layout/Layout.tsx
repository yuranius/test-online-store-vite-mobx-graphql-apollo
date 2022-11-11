import React, {FC, PropsWithChildren, useEffect} from 'react';
import styled from './Layout.module.scss'
import Navbar from "../navbar/Navbar";
import {useQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "../../../query/authAPI";


export interface ILoggedUserData {
	viewer: User
}

export type User = {
	user?: UserElement
}


type UserElement = {
	__typename: string
	objectId: string
	username: string
	role: string
}

const Layout: FC<PropsWithChildren> = ({children}) => {

	const {data} = useQuery<ILoggedUserData>(GET_LOGGED_USER)

	useEffect( () => {
		console.log( '📌:Layout',data?.viewer.user,'🌴 🏁')
		
	}, [data])

	return (
			<>
				<Navbar user={data?.viewer.user}/>
				<div className={styled.container}>
					{children}
				</div>
			</>
	);
};

export default Layout;