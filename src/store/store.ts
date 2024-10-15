import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { newsSLice } from './news/slice'
export const store = configureStore({
	reducer: {
		[newsSLice.name]: newsSLice.reducer
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
