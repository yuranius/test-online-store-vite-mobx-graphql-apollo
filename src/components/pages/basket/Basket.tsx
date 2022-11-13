import React, {FC} from 'react';
import Layout from "../../ui/layout/Layout";
import styled from './Basket.module.scss'
import cn from "classnames";

const Basket:FC = () => {
	return (
			<Layout>
					<div className={cn(styled.wrapper, 'dark:text-red-400')}>Basket</div>
			</Layout>
	);
};

export default Basket;