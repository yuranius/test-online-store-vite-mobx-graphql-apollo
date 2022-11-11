import React, {FC, useEffect} from 'react';
import styled from './Device.module.scss'
import {useGetDevice} from "../../../hooks/API/useGetDevice";
import {useParams} from "react-router-dom";

const Device:FC = () => {
	
	const {id} = useParams()

	const {device,getDevice} = useGetDevice()
	
	useEffect( () => {
		getDevice({id})
	}, [])
	
	console.log( '📌:',device,'🌴 🏁')
	

	return (
			<div>
				{device?.name}
			</div>
	);
};

export default Device;