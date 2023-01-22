import cn from 'classnames'
import React, {FC, useState} from 'react'

import {IconSetting} from '../../icon/Icon'
import styled from './Filter.module.scss'


const Filter: FC = () => {
	const [rotate, setRotate] = useState(false)
	const showSelect = () => {
		setRotate(!rotate)
	}

	return (
		<div className={styled.wrapper}>
			<div className={cn(styled.button, rotate ? 'rotate-90' : 'rotate-0')} onClick={showSelect}>
				<IconSetting />
			</div>
			<div className={cn(styled.filter, rotate ? 'h-48' : 'h-0')}>filter</div>
		</div>
	)
}

export default Filter