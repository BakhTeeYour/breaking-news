import { useMediaQuery } from 'usehooks-ts'
import classNames from 'classnames'
import { breakpoints } from 'shared/lib'
import { selectNews } from 'store/news/slice'
import { useAppSelector } from 'store/hooks'
import { Header } from 'shared/layouts'
import NewsList from 'components/news/news-list'
import NewsModalForm from 'components/news/news-modal-form'
import { Box, Typography } from 'ui-components'

const HomePage = () => {
	const isMobile = useMediaQuery(breakpoints.mobile)

	const { isLoading } = useAppSelector(selectNews)

	const containerClasses = classNames(
		'desktop:pb-[24px]',
		'pb-[120px]',
		'flex',
		'flex-col',
		'desktop:gap-y-[24px]',
		'container',
		'mx-auto'
	)

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

	return (
		<>
			<Header />
			<Box className={containerClasses}>
				{isMobile ? (
					<Typography color='txtCritical' size='text-4xl' isCenter>
						Breaking news
					</Typography>
				) : (
					<Typography color='txtCritical' size='text-6xl' isCenter>
						Breaking news
					</Typography>
				)}

				<Box className='py-[24px] w-full mx-auto'>
					<NewsList />
					<NewsModalForm />
				</Box>
			</Box>
		</>
	)
}

export default HomePage
