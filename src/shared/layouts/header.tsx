import { useMediaQuery } from 'usehooks-ts'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { breakpoints } from 'shared/lib'
import { useAppDispatch } from 'store/hooks'
import { Box, Button } from 'ui-components'
import { setIsOpenNewsModal } from 'store/news/slice'

type Props = {
	className?: string
}

export const Header = ({ className }: Props) => {
	const isMobile = useMediaQuery(breakpoints.mobile)
	const isNewsPage = window.location.href.includes('news')
	const dispatch = useAppDispatch()
	return (
		<Box
			className={classNames(
				isMobile ? 'h-[60px]' : 'h-[80px]',
				'flex',
				'items-center',
				'w-full',
				'shadow-md',
				isMobile ? 'px-2' : 'p-0',
				className
			)}
		>
			<Box className='container mx-auto flex items-center justify-between'>
				<Link to='/'>
					<img
						src='https://img.hhcdn.ru/employer-logo/3343609.png'
						height={56}
						width={56}
						alt='logo'
					/>
				</Link>
				{!isNewsPage && (
					<Button
						size={isMobile ? 'medium' : 'large'}
						onClick={() => dispatch(setIsOpenNewsModal(true))}
						color='primary'
					>
						Create
					</Button>
				)}
			</Box>
		</Box>
	)
}
