function sortByTitle<T extends { title: string }>(a: T, b: T) {
	if (a.title.toLowerCase() > b.title.toLowerCase()) {
		return 1
	}
	if (a.title.toLowerCase() < b.title.toLowerCase()) {
		return -1
	}
	return 0
}

export default sortByTitle
