import {useMutation} from "@apollo/client";
import {CREATE_BRAND, CREATE_TYPE, FETCH_TYPES_BRANDS} from "../../query/deviceAPI";




export const useAddTypeBrand = () => {

	const [createType, {loading: loadingType, error: errorType}] = useMutation(CREATE_TYPE, {
		// update cache apollo ----------------------------------------------------
		update( cache, {data:{createType}}){
			const {types}:any = cache.readQuery({query: FETCH_TYPES_BRANDS})
			const {brands}:any = cache.readQuery({query: FETCH_TYPES_BRANDS})
			cache.writeQuery({
				query: FETCH_TYPES_BRANDS,
				data: {
					brands,
					types: {...types, ...{edges: [...types.edges, {node: createType.type}]}}
				}
			})
		}
		// update cache apollo ----------------------------------------------------
	})

	const addType = (value: string) => {
		return createType({
			variables: {
				name: value
			}
		}).then( (data) => {
			return data.data.createType.type
		})
	}


	const [createBrand, {loading: loadingBrand, error: errorBrand} ] = useMutation(CREATE_BRAND, {
		// update cache apollo ---------------------------------------------------
		update(cache, {data:{createBrand}}){
			const {types}:any = cache.readQuery({query: FETCH_TYPES_BRANDS})
			const {brands}:any = cache.readQuery({query: FETCH_TYPES_BRANDS})
			cache.writeQuery({
				query: FETCH_TYPES_BRANDS,
				data:{
					types,
					brands: {...brands, ...{edges: [...brands.edges, {node: createBrand.brand}]},
				}}
			})
		}
		// update cache apollo ----------------------------------------------------
	})


	const addBrand = (value:string) => {
		return createBrand({
			variables:{
				name: value
			}
		}).then( (data) => {
			return data.data.createBrand.brand
		})
	}

	const loading = loadingType || loadingBrand

	const error = errorType || errorBrand

	return {addType, addBrand, loading, error}
}