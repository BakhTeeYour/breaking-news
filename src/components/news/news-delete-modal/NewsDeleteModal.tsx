import { useNavigate } from 'react-router-dom'
import { deleteNews, getAllNews } from 'shared/services'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectNews, setDeleteNewsId } from 'store/news/slice'
import { Box, Button, Modal, Typography } from 'ui-components'

const NewsDeleteModal = () => {
	const { deleteNewsId } = useAppSelector(selectNews)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleClose = () => dispatch(setDeleteNewsId(undefined))
	const handleDelete = async () => {
		await dispatch(deleteNews(deleteNewsId))
		navigate('/')

		await dispatch(getAllNews())
		dispatch(setDeleteNewsId(undefined))
	}

	if (!deleteNewsId) return null

	return (
		<Modal onBackdropClick={handleClose}>
			<Box className='flex w-[360px] bg-white rounded-[24px] gap-y-4 p-6 flex-col justify-between'>
				<Typography size='text-2xl' weight='font-semibold' color='txtBlack'>
					Confirm an action
				</Typography>
				<Typography size='text-xl' weight='font-semibold' color='txtCritical'>
					Do you really want to delete this news?
				</Typography>
				<Box className='flex items-center justify-around gap-x-4'>
					<Button
						size='medium'
						isCenter
						color='primary'
						className='grow'
						onClick={handleDelete}
					>
						Confirm
					</Button>
					<Button
						size='medium'
						isCenter
						color='secondary'
						className='grow'
						onClick={handleClose}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default NewsDeleteModal
