import classNames from 'classnames'
import { useMediaQuery } from 'usehooks-ts'
import { useState } from 'react'
import { breakpoints, getInitialNews, paginate } from 'shared/lib'
import { useStateLocal } from 'shared/hooks/useStateLocal'
import { News } from 'shared/types/news'
import NewsItem from '../news-item'
import { Box, Button, Pagination, Typography } from 'ui-components'
import { useAppDispatch } from 'store/hooks'
import { setIsOpenNewsModal } from 'store/news/slice'

const NewsList = () => {
	const isMobile = useMediaQuery(breakpoints.mobile)
	const dispatch = useAppDispatch()
	const [news] = useStateLocal<News[] | undefined>(
		'INITIAL_NEWS',
		getInitialNews()
	)

	const [currPage, setCurrPage] = useState(1)
	const totalPage = isMobile ? 2 : 8
	const count = news?.length
	const newsCrop: News[] | undefined = paginate(news!, currPage, totalPage)

	const handlePageChange = (currPage: number) => {
		setCurrPage(currPage)
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const containerClasses = classNames(
		'grid',
		isMobile ? 'grid-cols-1' : 'grid-cols-4',
		'gap-[12px]',
		'justify-items-center'
	)

	return (
		<>
			{news?.length ? (
				<>
					<Box className={containerClasses}>
						{newsCrop?.map(item => <NewsItem key={item.id} data={item} />)}
					</Box>
					<Box className='flex justify-center items-center mt-5'>
						<Pagination
							itemsCountPerPage={totalPage}
							pageRangeDisplayed={count!}
							onPageChange={e => handlePageChange(e)}
							defaultPage={currPage}
						/>
					</Box>
				</>
			) : (
				<Box className='flex flex-col gap-y-3 items-center'>
					<Typography color='txtPrimary' size='text-2xl'>
						Not results were found
					</Typography>
					<Typography color='txtPrimary' size='text-2xl'>
						Would you like to create one?
					</Typography>
					<Button
						size='large'
						color='primary'
						onClick={() => dispatch(setIsOpenNewsModal(true))}
					>
						Create
					</Button>
				</Box>
			)}
		</>
	)
}

export default NewsList
