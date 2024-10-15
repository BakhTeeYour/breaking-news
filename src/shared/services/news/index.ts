import API from 'shared/api'
import { getInitialNews, setInitialNews } from 'shared/lib'
import { News } from 'shared/types/news'
import { setIsLoading, setSelectedNews } from 'store/news/slice'
import { AppDispatch } from 'store/store'

export const getAllNews = () => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))

	try {
		const res = await API.news.fetchAllNews()
		const news: News[] = getInitialNews()
		setInitialNews(news.length ? news : res)
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setIsLoading(false))
	}
}

export const getNews = (id: string) => async (dispatch: AppDispatch) => {
	dispatch(setIsLoading(true))
	try {
		const news: News[] = getInitialNews()
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
		const news: News[] = getInitialNews()
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
		const news: News[] = getInitialNews()
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
			const news: News[] = getInitialNews()
			setInitialNews(news.filter(e => e.id !== newsId))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(setIsLoading(false))
		}
	}
