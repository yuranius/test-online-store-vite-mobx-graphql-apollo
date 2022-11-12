import React, {FC} from 'react';
import styled from './Pagination.module.scss'
import {IPagination} from '../../../types/propsTypes';


const Pagination: FC<IPagination> = ({total, limit, changePage, currentPage}) => {

	const pages = []

	const pageCount = Math.ceil(total / limit)

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}


	// let portionCount = Math.ceil(totalItemsCount / portionSize) //? portionSize - размер порции
	// let [portionNamber, setPortionNamber] = useState(1);
	//
	// let leftPortionPageNamber = (portionNamber - 1) * portionSize + 1; //* левая граница
	// let rightPortionPageNamber = portionNamber * portionSize; //* правая граница

	return (
			<div className={styled.wrapper}>
				<nav aria-label="Page navigation example">
					<ul className={styled.list}>
						<li>
							<button className={styled.arrowDisabled}>
								<span aria-hidden="true">&laquo;</span>
							</button>
						</li>
						{pages.map(page =>
								<li key={page}><button
										className={currentPage === page ? styled.itemActive : styled.item}
										onClick={() => changePage(page)}
								>{page}</button></li>
						)}
						<li>
							<button className={styled.arrow}>
								<span aria-hidden="true">&raquo;</span>
							</button>
						</li>
					</ul>
				</nav>
			</div>
	);
};

export default Pagination;