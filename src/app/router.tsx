import HomePage from 'pages/home'
import NewsPage from 'pages/news'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/news/:id',
		element: <NewsPage />
	},
	{
		path: '*',
		element: <HomePage />
	}
])
