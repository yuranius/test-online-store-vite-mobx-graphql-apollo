import {useMutation} from "@apollo/client";
import {CREATE_BRAND, CREATE_TYPE, FETCH_COUNT, FETCH_DEVICES, FETCH_TYPES_BRANDS} from "../../query/deviceAPI";




export const useAddTypeBrand = () => {

	const [createType, {loading: loadingType, error: errorType}] = useMutation(CREATE_TYPE, {
		update( cache, {data:{newType}}){
			//const { types }:any = cache.readQuery({query: FETCH_TYPES_BRANDS})

			const {types}:any = cache.readQuery({query: FETCH_TYPES_BRANDS})
			console.log( '📌:',types,'🌴 🏁')

			// cache.writeQuery({
			// 	query: FETCH_TYPES_BRANDS,
			// 	data: {
			// 		types: [newType, ...types]
			// 	}
			// })
		}
	})


	const [createBrand, {loading: loadingBrand, error: errorBrand} ] = useMutation(CREATE_BRAND)




	const addType = (value: string) => {
		return createType({
			variables: {
				name: value
			}
		}).then( (data) => {
			return data.data.createType.type
		})
	}

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