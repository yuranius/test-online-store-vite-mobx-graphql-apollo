import React, {ChangeEvent, FC, MouseEventHandler, useState} from 'react';
import styled from './Pagination.module.scss'
import {IPagination} from '../../../types/propsTypes';
import cn from "classnames";


const Pagination: FC<IPagination> = ({total, limit, changePage, currentPage, portionSize}) => {

	const pages = []

	const pageCount = Math.ceil(total / limit)

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1)
	}


	let portionCount = Math.ceil(pageCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1);

	let leftPortionPageNamber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNamber = portionNumber * portionSize;

	const changePortionNamber = (e: React.MouseEvent<HTMLButtonElement>) => {
		// @ts-ignore
		const id = e.target.id
		if(id === 'down'){
			setPortionNumber(--portionNumber)
		} else {
			setPortionNumber(++portionNumber)
		}
		changePage((portionNumber - 1) * portionSize + 1)
	}


	return (
			<div className={styled.wrapper}>
				<nav aria-label="Page navigation example">
					<ul className={styled.list}>
						<li>
							<button className={cn(portionNumber <= 1 ? styled.arrowDisabled : styled.arrow, 'dark:text-gray-100 dark:hover:text-gray-800')}
							        disabled={portionNumber <= 1}
							        id='down'
							        onClick={(e) => changePortionNamber(e)}>
								<span className='pointer-events-none'>&laquo;</span>
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
									className={cn(portionNumber >= portionCount ? styled.arrowDisabled : styled.arrow, 'dark:text-gray-100 dark:hover:text-gray-800')}
									disabled={portionNumber >= portionCount}
									id='up'
									onClick={(e) => changePortionNamber(e)}>
								<span className='pointer-events-none'>&raquo;</span>
							</button>
						</li>
					</ul>
				</nav>
			</div>
	);
};

export default Pagination;