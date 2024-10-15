import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { News } from 'shared/types/news'
import { RootState } from 'store/store'

type NewsSliceState = {
	news: News[] | null
	selectedNews: News | null
	isLoading: boolean
	isError: boolean
	isOpenNewsModal: boolean
	isEdit: boolean
	deleteNewsId: string | undefined
}

const initialState: NewsSliceState = {
	news: null,
	selectedNews: null,
	isLoading: false,
	isError: false,
	isOpenNewsModal: false,
	isEdit: false,
	deleteNewsId: undefined
}

export const newsSLice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setNews: (state, { payload }: PayloadAction<News[]>) => ({
			...state,
			news: payload
		}),
		setSelectedNews: (state, { payload }: PayloadAction<News | null>) => ({
			...state,
			selectedNews: payload
		}),
		setIsLoading: (state, { payload }: PayloadAction<boolean>) => ({
			...state,
			isLoading: payload
		}),
		setIsError: (state, { payload }: PayloadAction<boolean>) => ({
			...state,
			isError: payload
		}),
		setIsOpenNewsModal: (state, { payload }: PayloadAction<boolean>) => ({
			...state,
			isOpenNewsModal: payload
		}),
		setIsEditNews: (state, { payload }: PayloadAction<boolean>) => ({
			...state,
			isEdit: payload
		}),
		setDeleteNewsId: (
			state,
			{ payload }: PayloadAction<string | undefined>
		) => ({
			...state,
			deleteNewsId: payload
		})
	},
	extraReducers: () => {}
})

export const selectNews = (state: RootState) => state.news

export const {
	setNews,
	setSelectedNews,
	setIsLoading,
	setIsError,
	setIsOpenNewsModal,
	setIsEditNews,
	setDeleteNewsId
} = newsSLice.actions
