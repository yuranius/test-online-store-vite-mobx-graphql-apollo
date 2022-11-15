import React, {FC, memo, useContext} from 'react';
import cn from "classnames";
import styled from './CreateDevice.module.scss';
import {IModal} from "../../../../types/propsTypes";
import Form from "./Form/Form";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import Title from "./Title/Title";
import Footer from "./Footer/Footer";

const CreateDevice: FC<IModal> = memo((props) => {
	const {show, onHide, id, title, onSave, value, setValue} = props

	const {types, brands} = useGetTypesBrands()

	const {device} = useContext(Context)

	return (
			<div className={cn(styled.wrapper, !show && 'hidden')}>
				<div className={styled.container}>
					<div className={cn(styled.cart, 'bg-white dark:bg-gray-600')}>
						<Title onHide={onHide} title={title}/>
						{(types && brands) && <Form device={device} types={types} brands={brands}/>}
						<Footer onHide={onHide} onSave={onSave} id={id}/>
					</div>
				</div>
			</div>
	);
})

export default CreateDevice;