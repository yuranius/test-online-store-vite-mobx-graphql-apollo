import React, {FC, useState} from 'react';
import styled from './Pagination.module.scss'
import {IPagination} from '../../../types/propsTypes';
import cn from "classnames";


const Pagination: FC<IPagination> = ({total, limit, changePage, currentPage}) => {

	const pages = []

	const pageCount = Math.ceil(total / limit)

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}


	let portionCount = Math.ceil(pageCount / 5)
	let [portionNumber, setPortionNumber] = useState(2);

	let leftPortionPageNamber = (portionNumber - 1) * 5 + 1;
	let rightPortionPageNamber = portionNumber * 5;
	

	


	return (
			<div className={styled.wrapper}>
				<nav aria-label="Page navigation example">
					<ul className={styled.list}>
						<li>
							<button className={styled.arrowDisabled} disabled={portionNumber <= 1} onClick={()=> { setPortionNumber(portionNumber - 1) }}>
								<span aria-hidden="true" className='dark:text-gray-100'>&laquo;</span>
							</button>
						</li>
						{pages
						.filter( (p) => p >= leftPortionPageNamber && p <= rightPortionPageNamber)
						.map(page =>
								<li key={page}>
									<button
											className={cn(currentPage === page ? styled.itemActive : styled.item, 'dark:hover:text-gray-900 dark:text-white')}
											onClick={() => changePage(page)}
									>{page}</button>
								</li>
						)}
						<li>
							<button
									className={cn(styled.arrow, 'dark:text-gray-100 dark:hover:text-gray-800')}
									disabled={portionNumber >= portionCount}
									onClick={()=> { setPortionNumber(portionNumber + 1) }}>
								<span aria-hidden="true">&raquo;</span>
							</button>
						</li>
					</ul>
				</nav>
			</div>
	);
};

export default Pagination;