import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'

interface IBox
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode
	className?: string
}

export const Box: FC<IBox> = ({ children, className, ...rest }) => {
	return (
		<div className={className} {...rest}>
			{children}
		</div>
	)
}
