import _ from 'lodash'
import { Button } from 'ui-components'

type Props = {
	pageCount: number
	totalPage: number
	onPageChange: (page: number) => void
	currPage: number
}

export const Pagination = ({
	pageCount,
	totalPage,
	onPageChange,
	currPage
}: Props) => {
	const pageSize = Math.ceil(pageCount / totalPage)

	if (pageSize === 1) return null

	const pages = _.range(1, pageSize + 1)
	return (
		<ul className='flex'>
			{pages.map(e => (
				<li
					className={`p-1 rounded-[8px]  ${currPage === e && 'active'}`}
					key={`page_${e}`}
				>
					<Button
						className=''
						onClick={() => onPageChange(e)}
						size='small'
						color={currPage === e ? 'primary' : 'secondary'}
					>
						{e}
					</Button>
				</li>
			))}
		</ul>
	)
}
