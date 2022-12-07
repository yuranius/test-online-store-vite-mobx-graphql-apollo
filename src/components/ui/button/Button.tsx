import {ButtonHTMLAttributes, FC, PropsWithChildren} from 'react';
import styled from './Button.module.scss'


interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button:FC<PropsWithChildren<IButton>> = ({children, ...rest}) => {
	return  <button className={styled.button} {...rest}>{children}</button>
}
		


export default Button;