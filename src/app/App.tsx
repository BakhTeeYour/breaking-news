import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { getAllNews } from 'shared/services'
import { router } from './router'

store.dispatch(getAllNews())

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}

export default App
