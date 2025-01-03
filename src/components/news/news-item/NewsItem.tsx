import classNames from 'classnames'
import { FC } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Link } from 'react-router-dom'
import { News } from 'shared/types/news'
import { breakpoints } from 'shared/lib'
import { Button } from 'ui-components'

type Props = {
	data: News
}

const NewsItem: FC<Props> = ({ data }) => {
	const isMobile = useMediaQuery(breakpoints.mobile)
	const containerClasses = classNames(
		'flex',
		'flex-col',
		'gap-y-[18px]',
		'justify-between',
		'rounded-[24px]',
		'bg-neutral-100',
		'relative',
		isMobile ? 'w-full' : 'max-w-[360px]',
		'p-4'
	)
	return (
		<div className={containerClasses}>
			<div className='font-bold text-xl'>{data.title}</div>

			<img
				src={data.image}
				alt='logo'
				className={classNames(
					'rounded-[12px]',
					isMobile ? 'h-[240px]' : 'h-[180px]',
					'bg-contain'
				)}
			/>
			<div className='flex justify-end'>
				<Link to={`/news/${data.id}`}>
					<Button size='small' color='primary'>
						Read more...
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NewsItem
