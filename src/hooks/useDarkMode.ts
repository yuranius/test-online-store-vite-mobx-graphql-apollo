import {useEffect, useState} from "react";

const UseDarkMode = () => {

	const [theme, setTheme] = useState<'dark' | 'light'>(localStorage.theme)
	const colorTheme = theme === 'dark' ? 'light' : 'dark';

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
		localStorage.setItem('theme', 'dark')
	}

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove(colorTheme)
		root.classList.add(theme)
		theme && localStorage.setItem('theme', theme)
	}, [theme, colorTheme])

	return {colorTheme, setTheme}

};

export default UseDarkMode;