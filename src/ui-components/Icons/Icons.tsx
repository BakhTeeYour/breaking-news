import { FC } from 'react'
import classNames from 'classnames'
import { iconSizes, IconsName, Size, textColor, textColors } from 'shared/theme'
import UploadIcon from './icons/upload'
import ArrowLeftIcon from './icons/arrow-left'
import PenIcon from './icons/pen'
import DeleteIcon from './icons/delete'

type Props = {
	name: IconsName
	size: Size | 'full-width'
	color?: textColor
	hasIndent?: boolean
	onClick?: () => void
}

const svg: Record<IconsName, FC> = {
	upload: UploadIcon,
	'arrow-left': ArrowLeftIcon,
	pen: PenIcon,
	delete: DeleteIcon
}

export const Icons: FC<Props> = ({ name, size, color, hasIndent, onClick }) => {
	const SvgIcon = svg[name]
	const iconSize = iconSizes[size] ?? size

	const iconClasses = classNames(
		'flex items-center justify-center',
		iconSize,
		color ? textColors[color] : '',
		onClick ? 'cursor-pointer' : '',
		hasIndent ? 'p-[6px]' : ''
	)

	return (
		<div className={iconClasses} onClick={onClick}>
			<SvgIcon />
		</div>
	)
}
