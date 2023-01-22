import {FC, PropsWithChildren} from 'react'

import styled from './Button.module.scss'


const Button: FC<PropsWithChildren> = ({children, ...rest}) => {
	return (
		<button className={styled.button} {...rest}>
			{children}
		</button>
	)
}
export default Button;