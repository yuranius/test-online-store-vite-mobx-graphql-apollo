import React, {FC} from 'react';
import styled from './CreateBrand.module.scss'
import cn from 'classnames'
import './style.css'

interface IModal {
	show: boolean
	onHide: () => void
}

const CreateBrand: FC<IModal> = ({show, onHide}) => {

	return (
			<div className={cn(styled.wrapper, !show && 'hidden')}>
				<div className={styled.container}>
					<div className={styled.cart}>
						<div className={styled.title}>
							<h5>Создать бренд</h5>
							<button type="button"
							        onClick={onHide}
							>
									<span>
										<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="5 5 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
											      d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</span>
							</button>
						</div>
						<div className={styled.body}>
							<input type="text"/>
						</div>
						<div
								className={styled.footer}>
							<button type="button"
							        className={styled.closeButton}
							        onClick={onHide}
							>Закрыть</button>
							<button type="button" className={styled.saveButton}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
	);
};

export default CreateBrand;