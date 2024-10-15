import { useEffect, useId, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object } from 'yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { createNews, getAllNews, updateNews } from 'shared/services'
import { News } from 'shared/types/news'
import {
	Box,
	Button,
	FilePicker,
	Input,
	Modal,
	Typography
} from 'ui-components'
import {
	selectNews,
	setIsEditNews,
	setIsOpenNewsModal,
	setSelectedNews
} from 'store/news/slice'

const scheme = object().shape({
	title: yup.string().required('Required field'),
	description: yup.string().required('Required field'),
	image: yup.mixed().nullable()
})

const NewsModalForm = () => {
	const [preview, setPreview] = useState('')
	const { selectedNews, isOpenNewsModal, isEdit } = useAppSelector(selectNews)
	const dispatch = useAppDispatch()
	const id = useId()

	const form = useForm({
		defaultValues: {
			title: '',
			description: '',
			image: null
		},
		resolver: yupResolver(scheme)
	})
	const handleClose = () => {
		dispatch(setIsEditNews(false))
		dispatch(setIsOpenNewsModal(false))
		setPreview('')
		form.reset()
	}

	const handleSubmit = async (values: FieldValues) => {
		const payload = isEdit
			? {
					...values,
					id: selectedNews?.id
				}
			: { ...values, id }

		if (isEdit) {
			await dispatch(updateNews(values as News))
			dispatch(setSelectedNews({ ...values, id: selectedNews?.id } as News))
		} else {
			await dispatch(createNews(payload as News))
		}

		await dispatch(getAllNews())
		handleClose()
	}

	useEffect(() => {
		if (isEdit) {
			if (selectedNews) {
				form.reset(selectedNews)
				setPreview(selectedNews?.image)
				form.setValue('image', selectedNews.image)
			}
		}
	}, [form, isEdit, selectedNews])

	if (!isOpenNewsModal) return null

	return (
		<Modal onBackdropClick={handleClose}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='bg-white p-4 lg:container rounded-[24px] h-fit overflow-auto overflow-x-hidden'
			>
				<Box className='w-[calc(100vw-60px)] lg:w-[900px] flex flex-col gap-y-4'>
					<Typography
						color='btnPrimaryDefault'
						size='text-medium'
						weight='font-[550]'
					>
						Title
					</Typography>
					<Input
						size='default'
						name='title'
						control={form.control}
						placeholder='Enter a title'
						isTextArea
						rows={2}
					/>
					<Typography
						color='btnPrimaryDefault'
						size='text-medium'
						weight='font-[550]'
					>
						Description
					</Typography>
					<Input
						size='default'
						name='description'
						control={form.control}
						placeholder='Enter a description'
						isTextArea
						rows={8}
					/>
					{preview && (
						<img src={preview} alt='logo' className=' rounded-[24px] mt-4' />
					)}
					<FilePicker
						name='image'
						control={form.control}
						isOnlyImage
						setPreview={setPreview}
					/>
				</Box>
				<Box className='flex justify-center bg-white gap-x-3 border-t border-t-buttonSecondary-hover py-4'>
					<Button
						className='grow'
						size='medium'
						color='primary'
						isCenter
						htmlType='submit'
					>
						{isEdit ? 'Edit' : 'Create'}
					</Button>
					<Button
						className='grow'
						size='medium'
						color='secondary'
						isCenter
						onClick={handleClose}
					>
						Cancel
					</Button>
				</Box>
			</form>
		</Modal>
	)
}

export default NewsModalForm
