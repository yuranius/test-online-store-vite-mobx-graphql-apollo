import {ButtonHTMLAttributes, FC, MouseEventHandler, PropsWithChildren} from 'react'

import styled from './Button.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<PropsWithChildren<Props>> = ({children,disabled, onClick, ...rest}) => {

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (disabled) return;
		onClick && onClick(e);
	};


	return (
		<button className={styled.button} disabled={disabled} onClick={handleClick} {...rest}>
			{children}
		</button>
	)
}
export default Button;