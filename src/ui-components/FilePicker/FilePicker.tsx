import { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { Box, Button } from 'ui-components'
import { fileToBase64 } from 'shared/lib'

type Props<T extends FieldValues> = {
	name: Path<T>
	control: Control<T>
	isOnlyImage?: boolean
	setPreview?: (preview: string) => void
}

export function FilePicker<T extends FieldValues>({
	name,
	control,
	isOnlyImage,
	setPreview
}: Props<T>) {
	const [file, setFile] = useState<File | null>(null)
	const [convertedFile, setConvertedFile] = useState('')

	const convertFile = async (file: File) => {
		try {
			const convert = await fileToBase64(file)
			setConvertedFile(convert)
		} catch (error) {
			console.log(error)
		}
	}
	const handleFilePick = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = isOnlyImage ? 'image/*' : '.zip,.rar,.7zip'
		input.multiple = false
		input.click()
		input.addEventListener('change', e => {
			e.preventDefault()
			const file = input.files?.[0]
			if (!file) {
				return
			}
			if (isOnlyImage) {
				if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
					toast.error('Available format image "jpeg/png"')
					return
				}
			}
			setFile(file)
		})
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange }, fieldState }) => {
				const error = fieldState.error?.message

				// eslint-disable-next-line react-hooks/rules-of-hooks
				useEffect(() => {
					if (isOnlyImage) convertFile(file as File)
					onChange(convertedFile)
					if (file?.name) {
						const reader = new FileReader()
						reader.readAsDataURL(file as File)
						reader.onload = () => setPreview?.(String(reader.result))
					}
				}, [onChange, convertedFile, file])

				return (
					<Box className='w-full'>
						<Button
							color='secondary'
							leftIcon='upload'
							size='medium'
							isCenter
							className='w-full'
							onClick={handleFilePick}
						>
							{file ? 'Download again' : 'Download'}
						</Button>
						{error && (
							<span className={classNames('text-critical')}>{error}</span>
						)}
					</Box>
				)
			}}
		/>
	)
}
