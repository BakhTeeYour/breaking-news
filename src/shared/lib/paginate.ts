export const paginate = <T>(items: T[], pageNum: number, pageSize: number) => {
	if (items) {
		const startIndex = (pageNum - 1) * pageSize
		return [...items].splice(startIndex, pageSize)
	}
}
