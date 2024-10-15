import { useMediaQuery } from 'usehooks-ts'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { breakpoints } from 'shared/lib'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
	selectNews,
	setDeleteNewsId,
	setIsEditNews,
	setIsOpenNewsModal,
	setSelectedNews
} from 'store/news/slice'
import { Header } from 'shared/layouts/header'
import { Box, Button, Icons, Typography } from 'ui-components'
import NewsModalForm from '../news-modal-form'
import NewsDeleteModal from '../news-delete-modal'

const News = () => {
	const isMobile = useMediaQuery(breakpoints.mobile)
	const { selectedNews, isLoading } = useAppSelector(selectNews)

	const dispatch = useAppDispatch()

	if (isLoading) {
		return (
			<>
				<Header />
				<Typography
					color='txtBlack'
					size='text-3xl'
					weight='font-bold'
					className='p-3 container mx-auto'
				>
					Loading...
				</Typography>
			</>
		)
	}

	const handleEditNews = () => {
		dispatch(setSelectedNews(selectedNews))
		dispatch(setIsEditNews(true))
		dispatch(setIsOpenNewsModal(true))
	}

	return (
		<Box>
			<Header />
			<Box className={classNames(isMobile ? '' : 'container lg:mx-auto')}>
				<Box className='flex items-center justify-between pr-3'>
					<Link to='/' className='p-3 flex items-center'>
						<Icons name='arrow-left' size='xLarge' color='textBlue' />
						<Typography color='textBlue'>Back to News</Typography>
					</Link>
					<Box className='flex gap-x-1 self-end'>
						<Button
							onClick={handleEditNews}
							size='medium'
							color='secondary'
							icon='pen'
						></Button>
						<Button
							size='medium'
							color='secondary'
							onClick={() => dispatch(setDeleteNewsId(selectedNews?.id))}
							icon='delete'
						></Button>
					</Box>
				</Box>

				<Box className='bg-neutral-100 rounded-[24px] my-5 flex flex-col gap-y-10 p-3 pt-0 lg:p-6'>
					<Typography color='txtBlack' size='text-4xl' weight='font-bold'>
						{selectedNews?.title}
					</Typography>
					<img
						className='rounded-[24px] lg:w-fit lg:h-fit'
						src={selectedNews?.image}
						alt='image'
					/>
					<Typography color='txtBlack' size='text-lg' weight='font-medium'>
						{selectedNews?.description}
					</Typography>
				</Box>
			</Box>
			<NewsModalForm />
			<NewsDeleteModal />
		</Box>
	)
}

export default News
