import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { IconsName, Size } from 'shared/theme'
import { Icons } from 'ui-components/Icons'

type Props = PropsWithChildren<{
	size: Exclude<Size, 'xLarge' | 'xxLarge' | 'xSmall'>
	color: 'primary' | 'secondary' | 'txtSecondary' | 'active' | 'disactive'
	leftIcon?: IconsName
	rightIcon?: IconsName
	disabled?: boolean
	icon?: IconsName
	type?: 'button' | 'link'
	htmlType?: 'button' | 'submit' | 'reset'
	href?: string
	onClick?: () => void
	isCenter?: boolean
	className?: string
}>

const buttonSizes = {
	small: 'py-[8px] px-[12px]',
	medium: 'py-[12px] px-[34px]',
	large: 'py-[14px] px-[54px]'
}

const iconOnlyButtonSizes = {
	small: 'p-[8px]',
	medium: 'p-[12px]',
	large: 'p-[12px]'
}

const buttonColors = {
	primary:
		'bg-buttonPrimary-default border-buttonPrimary-default text-white hover:bg-buttonPrimary-hover hover:border-buttonPrimary-hover active:bg-green-500 active:border-green-500',
	secondary:
		'bg-white border-buttonSecondary-hover border text-black hover:bg-buttonSecondary-hover',
	txtSecondary:
		'bg-buttonSecondary-default border-buttonSecondary-default text-secondary hover:bg-buttonSecondary-hover',
	active: 'bg-[#E4F5EE] border-[#E4F5EE] text-black text-base font-normal',
	disactive:
		'bg-buttonSecondary-default border-buttonSecondary-default text-black text-base font-normal'
}

export const Button: FC<Props> = ({
	children,
	size,
	color,
	leftIcon,
	rightIcon,
	disabled,
	icon,
	type = 'button',
	htmlType = 'button',
	href,
	onClick,
	isCenter = false,
	className
}) => {
	const isButton = type === 'button'
	const buttonSize = icon ? iconOnlyButtonSizes[size] : buttonSizes[size]
	const buttonColor = buttonColors[color]
	const buttonClasses = classNames(
		'inline-flex',
		'gap-x-[6px]',
		'text-[14px] leading-[16px]',
		color === 'active' || color === 'disactive'
			? 'font-normal'
			: 'font-semibold',
		'rounded-[8px]',
		'items-center',
		'border',
		className,
		isButton ? buttonSize : 'p-0',
		buttonColor,
		'disabled:bg-buttonPrimary-disabled disabled:border-buttonPrimary-disabled',
		{
			'justify-center': isCenter
		},
		'transition-all'
	)

	const content = (
		<>
			{leftIcon && <Icons name={leftIcon} size={size} />}
			<span className='whitespace-nowrap'>
				{icon ? <Icons name={icon} size={size} /> : children}
			</span>
			{rightIcon && <Icons name={rightIcon} size={size} />}
		</>
	)

	const style = isButton
		? {
				boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)'
			}
		: {}

	if (href) {
		return (
			<Link to={href} className={buttonClasses} style={style}>
				{content}
			</Link>
		)
	}

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			style={style}
			className={buttonClasses}
			type={htmlType}
		>
			{content}
		</button>
	)
}
