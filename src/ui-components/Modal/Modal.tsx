import { FC, useEffect } from 'react'
import styles from './modal.module.css'
import { Box } from 'ui-components'

interface IProps {
	children: JSX.Element
	onBackdropClick?: () => void
}
export const Modal: FC<IProps> = ({ children, onBackdropClick = () => {} }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])
	return (
		<Box
			className='fixed top-0 left-0 w-full h-full bg-[#23232980]  backdrop-blur-[2px] z-50 flex items-center justify-center'
			onClick={onBackdropClick}
		>
			<Box onClick={e => e.stopPropagation()} className={styles['fade-in']}>
				{children}
			</Box>
		</Box>
	)
}
