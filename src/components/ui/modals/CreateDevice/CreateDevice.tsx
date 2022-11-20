import React, {FC, memo, useContext, useState} from 'react';
import cn from "classnames";
import styled from './CreateDevice.module.scss';
import {IModal} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import Title from "./Title/Title";
import FormFormik from "./Formic/FormFormik";

const CreateDevice: FC<IModal> = memo((props) => {
	const {showModal, onHide, id, title} = props
	const [value, setValue] = useState('')

	const {types, brands} = useGetTypesBrands()

	const {device} = useContext(Context)


	return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={styled.container}>
					<div className={cn(styled.cart, 'bg-white dark:bg-gray-600')}>
						<Title onHide={onHide} title={title}/>
						<FormFormik types={types} brands={brands} showModal={showModal} onHide={onHide}  />
					</div>
				</div>
			</div>
	);
})

export default CreateDevice;