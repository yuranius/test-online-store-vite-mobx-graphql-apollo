import {useQuery} from "@apollo/client";
import {FETCH_TYPES_BRANDS} from "../../query/deviceAPI";
import {useEffect, useState} from "react";
import {INodeTypeBrand} from "../../types/queryTypes";
import {Selected} from "../../types/propsTypes";

export const useGetTypesBrands = () => {
	const {data} = useQuery(FETCH_TYPES_BRANDS)

	const [ types, setTypes ] = useState([{id: '', name:''}])
	const [ brands, setBrands ] = useState([{id: '', name: ''}])

	useEffect ( () => {
		setTypes(data?.types.edges.map(({node}:INodeTypeBrand) => ({id: node.objectId, name: node.name})))
		setBrands(data?.brands.edges.map(({node}:INodeTypeBrand) => ({id: node.objectId, name: node.name})))
	},[data])



	return {types, brands}

 }