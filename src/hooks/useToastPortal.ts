

import {useEffect, useState} from "react";
import {uuid} from "../utils/uuid";


export const useToastPortal = () => {
	const [loaded, setLoaded] = useState(false)
	const [portalId] = useState(`toast-portal-${uuid()}`)

	useEffect( ():any => {
		const div = document.createElement('div')
		div.id = portalId
		// @ts-ignore
		div.style = 'position: fixed; top: 10px; right: 10px;'
		document.getElementsByTagName('body')[0].prepend(div)

		setLoaded(true)

		return () => document.getElementsByTagName('body')[0].removeChild(div)
	}, [portalId])

	return {loaded, portalId}
}