import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import { textColor, textColors } from 'shared/theme'
import { Box } from 'ui-components/Box'

type Props = PropsWithChildren<{
	size?: string
	color: textColor
	weight?: string
	uppercase?: boolean
	noWrap?: boolean
	isCenter?: boolean
	maxLines?: number
	capitalize?: boolean
	className?: string
}>

export const Typography: FC<Props> = ({
	size = 'text-sm',
	color,
	weight = 'regular',
	children,
	uppercase,
	noWrap,
	isCenter,
	maxLines,
	capitalize,
	className
}) => {
	const textColor = textColors[color]

	const typographyClasses = classNames(
		size,
		textColor,
		weight,
		{
			uppercase
		},
		noWrap ? 'whitespace-nowrap' : '',
		isCenter ? 'text-center' : '',
		maxLines ? [`h-[40px]`, `overflow-hidden`] : [],
		'letter-spacing-[0.5px]',
		capitalize ? 'capitalize' : '',
		className,
		'transition-all'
	)

	return <Box className={typographyClasses}>{children}</Box>
}
