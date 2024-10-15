import { Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from 'store/hooks'
import { getNews } from 'shared/services'
import News from 'components/news/news'

const NewsPage = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()

	if (!id) {
		<Navigate to='/' />
	}

	useEffect(() => {
		if (id) dispatch(getNews(id))
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}, [])

	return (
		<>
			<News />
		</>
	)
}

export default NewsPage
