import classNames from 'classnames'
import { useId, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { IconsName } from 'shared/theme'
import { Icons, Box } from 'ui-components'

type Props<T extends FieldValues> = {
	placeholder?: string
	isTextArea?: boolean
	rows?: number
	size: 'default'
	leftIcon?: IconsName
	rightIcon?: IconsName
	name: Path<T>
	control: Control<T>
	htmlType?: string
	height?: string
	onLeftIconClick?: () => void
	onRightIconClick?: () => void
	disabled?: boolean
	min?: number
}

const inputSizes = {
	default: 'h-[44px]'
}

export function Input<T extends FieldValues>({
	placeholder,
	size,
	leftIcon,
	rightIcon,
	name,
	control,
	htmlType,
	height,
	onLeftIconClick,
	onRightIconClick,
	disabled,
	min,
	isTextArea = false,
	rows = 4
}: Props<T>) {
	const id = useId()
	const [isFocused, setIsFocused] = useState(false)

	const inputSize = isTextArea ? 'h-full' : inputSizes[size]

	const containerClasses = classNames(
		'flex',
		'flex-col',
		'gap-y-[6px]',
		'w-full'
	)

	const inputContainerClasses = classNames(
		'flex',
		'gap-x-[8px]',
		'px-[16px]',
		inputSize,
		'rounded-[8px]',
		'bg-buttonSecondary-default',
		'border',
		'items-center'
	)

	const inputClasses = classNames(
		'placeholder-secondary',
		'border-none',
		'w-full',
		'text-[16px]',
		'py-[16px]',
		'leading-[20px]',
		'bg-buttonSecondary-default',
		'focus:outline-none',
		'h-full'
	)

	const hintClasses = classNames('font-sans', 'text-[14px] leading-[20px]')
	const getProps = (field: FieldValues, error?: string) => {
		return {
			className: classNames(inputClasses, {
				'text-txtBlack': !error,
				'text-critical': error
			}),
			id,
			placeholder,
			...field,
			onFocus: () => {
				setIsFocused(true)
			},
			onBlur: () => {
				field.onBlur()
				setIsFocused(false)
			},
			type: htmlType,
			disabled: disabled,
			min
		}
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const error = fieldState.error?.message

				return (
					<Box className={containerClasses}>
						<Box
							className={classNames(inputContainerClasses, {
								'border-primary-700': isFocused && !error,
								'border-error-600': isFocused && error,
								'border-[transparent]': !isFocused
							})}
							style={{
								height
							}}
						>
							{leftIcon && (
								<Icons size='large' onClick={onLeftIconClick} name={leftIcon} />
							)}
							{isTextArea ? (
								<textarea rows={rows} {...getProps(field, error)} />
							) : (
								<input {...getProps(field, error)} />
							)}

							{rightIcon && (
								<Icons
									size='large'
									onClick={onRightIconClick}
									name={rightIcon}
								/>
							)}
						</Box>

						{error && (
							<span className={classNames('text-critical')}>{error}</span>
						)}
					</Box>
				)
			}}
		/>
	)
}
