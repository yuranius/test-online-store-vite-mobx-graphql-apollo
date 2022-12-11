export const createArrForRatingOption = () => {
	let arr = []
	for (let i = 1; i < 6; i++) {
		arr.push({value: i, label: i})
	}
	return arr
}