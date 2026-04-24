const positiveRule = (value: number | null) =>
	value == null || value > 0 ? true : 'Must be positive'

export default positiveRule
