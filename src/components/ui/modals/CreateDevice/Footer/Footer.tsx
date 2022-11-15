import React, {FC} from 'react';
import styled from "../CreateDevice.module.scss";
import {IFooter} from "../../../../../types/propsTypes";

const Footer:FC<IFooter> = ({onHide,onSave, id}) => {
	return (
			<div className={styled.footer}>
				<button type="button"
				        className={styled.closeButton}
				        onClick={onHide}
				>Закрыть</button>
				<button type="button" className={styled.saveButton} onClick={() => onSave(id)}>Сохранить</button>
			</div>
	);
};

export default Footer;