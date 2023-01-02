import React, {FC, memo, useContext, useState} from 'react';
import cn from "classnames";
import styled from './CreateDevice.module.scss';
import {IModal} from "../../../../types/propsTypes";
import {useGetTypesBrands} from "../../../../hooks/API/useGetTypesBrands";
import {Context} from "../../../../main";
import Title from "./Title/Title";
import Form from "./Formic/Form";

const CreateDevice: FC<IModal> = memo((props) => {
	const {showModal, onHide, title} = props
	const [loading, setLoading] = useState(false)
		return (
			<div className={cn(styled.wrapper, !showModal && 'hidden')}>
				<div className={styled.container}>
					<div className={cn(styled.cart, 'bg-white dark:bg-gray-600')}>
						<Title onHide={onHide} title={title} loading={loading}/>
						<Form showModal={showModal} onHide={onHide} setLoading={setLoading} loading={loading} />
					</div>
				</div>
			</div>
	);
})

export default CreateDevice;