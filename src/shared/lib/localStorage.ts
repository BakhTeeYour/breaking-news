import { INITIAL_NEWS } from 'shared/constants'
import { News } from 'shared/types/news'

export const setInitialNews = (news: News[]) =>
	localStorage.setItem(INITIAL_NEWS, JSON.stringify(news))

export const getInitialNews = () =>
	JSON.parse(localStorage.getItem(INITIAL_NEWS) || '[]')
