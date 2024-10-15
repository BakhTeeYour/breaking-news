import { useEffect, useState } from 'react'

export const useStateLocal = <T>(key: string, initialValue: T) => {
	const [value, setValue] = useState<T>(() => {
		let currentValue

		try {
			currentValue = JSON.parse(
				localStorage.getItem(key) || String(initialValue)
			)
		} catch (error) {
			console.log(error)

			currentValue = initialValue
		}

		return currentValue as T
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [value, key])

	return [value, setValue] as const
}
