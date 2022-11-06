import React, {FC, PropsWithChildren} from 'react';
import styled from './Layout.module.scss'
import Navbar from "../navbar/Navbar";


const Layout: FC<PropsWithChildren> = ({children}) => {
	return (
			<>
				<Navbar/>
				<div className={styled.container}>
					{children}
				</div>
			</>
	);
};

export default Layout;