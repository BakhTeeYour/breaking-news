import API from 'shared/api'
import { getInitialNews, setInitialNews } from 'shared/lib'
import { News } from 'shared/types/news'
import { setIsLoading, setNews, setSelectedNews } from 'store/news/slice'
import { AppDispatch } from 'store/store'

export const getInitialAllNews = () => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))

	try {
		const res = await API.news.fetchAllNews()
		setInitialNews(res)
		dispatch(setNews(res))
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setIsLoading(false))
	}
}

export const getAllNews = () => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))
	try {
		const news: News[] = await getInitialNews()
		setInitialNews(news)
		dispatch(setNews(news))
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setIsLoading(false))
	}
}

export const getNews = (id: string) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))
	try {
		const news: News[] = await getInitialNews()
		const newsById = news?.find(e => e.id === id)
		if (newsById) dispatch(setSelectedNews(newsById))
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setIsLoading(false))
	}
}

export const createNews = (body: News) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))
	try {
		const news: News[] = await getInitialNews()
		setInitialNews([body, ...news])
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setIsLoading(false))
	}
}

export const updateNews = (body: News) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))
	try {
		const news: News[] = await getInitialNews()
		setInitialNews(news.map(e => (e.id === body.id ? body : e)))
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setIsLoading(false))
	}
}

export const deleteNews =
	(newsId?: string) => async (dispatch: AppDispatch) => {
		dispatch(setIsLoading(true))
		try {
			const news: News[] = await getInitialNews()
			setInitialNews(news.filter(e => e.id !== newsId))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}
