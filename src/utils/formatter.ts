export let format = (price: number):string | undefined=> {
	 if (price) return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0
	}).format(price)
}