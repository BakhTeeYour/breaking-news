import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Button } from 'ui-components'

type Props = {
	pageRangeDisplayed: number
	onPageChange: (page: number) => void
	defaultPage: number
	itemsCountPerPage: number
}

export const Pagination = ({
	pageRangeDisplayed = 6,
	onPageChange,
	defaultPage = 1,
	itemsCountPerPage = 6
}: Props) => {
	const [pageRange, setPageRange] = useState<number[]>()
	const [currentPage, setCurrentPage] = useState<number>(defaultPage)
	const totalPage = Math.ceil(pageRangeDisplayed / itemsCountPerPage)

	useEffect(() => {
		if (totalPage <= 7) {
			setPageRange(Array.from({ length: totalPage }, (_, index) => index + 1))
			return
		}
		if (currentPage <= 4) {
			setPageRange([1, 2, 3, 4, 5, 0, totalPage])
			return
		}
		if (currentPage >= totalPage - 3) {
			setPageRange([
				1,
				0,
				totalPage - 4,
				totalPage - 3,
				totalPage - 2,
				totalPage - 1,
				totalPage
			])
			return
		} else {
			setPageRange([
				1,
				0,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				0,
				totalPage
			])
		}
	}, [totalPage, currentPage])

	return (
		<ul className='flex gap-2'>
			{pageRange?.map((el, index) => {
				return (
					<Button
						size='small'
						color={currentPage === el ? 'primary' : 'secondary'}
						onClick={() => {
							if (el) setCurrentPage(el)
							onPageChange(el)
						}}
						className={classNames('transition-colors duration-100 ')}
						key={index}
					>
						{el ? `${el}` : '...'}
					</Button>
				)
			})}
		</ul>
	)
}
