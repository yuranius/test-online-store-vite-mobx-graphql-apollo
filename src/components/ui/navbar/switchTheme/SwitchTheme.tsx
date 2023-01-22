import cn from 'classnames'
import React, {FC} from 'react'

import useDarkMode from '../../../../hooks/useDarkMode'
import {DarkIcon, LightIcon} from '../../icon/Icon'
import styled from './SwitchTheme.module.scss'


const SwitchTheme: FC = () => {
	const {colorTheme, setTheme} = useDarkMode()

	return (
		<div>
			<button className={styled.bg} onClick={() => setTheme(colorTheme)}>
				<div
					className={cn(
						styled.button,
						colorTheme === 'light' ? 'bg-gray-700 translate-x-6 text-indigo-100' : 'bg-yellow-500 -translate-x-2 text-myBlue',
					)}
				>
					{colorTheme === 'light' ? <DarkIcon /> : <LightIcon />}
				</div>
			</button>
		</div>
	)
}

export default SwitchTheme