import {gql} from "@apollo/client";

export const FETCH_TYPES_BRANDS = gql`
    query {
        types{
            count
            edges{
                node {
                    objectId
                    name
                }
            }
        }
        brands {
            count
            edges {
                node{
                    objectId
                    name
                }
            }
        }
    }
`


export const FETCH_DEVICES_WHEN_BRAND_AND_TYPE = gql`
    query ( $limit: Int!, $skip: Int! $brandId: ID $typeId: ID) {
        devices ( first: $limit , skip: $skip, where: {OR: {brandId:{have: {objectId: {
            equalTo: $brandId
        }}}}, AND: {typeId: {have: {objectId: {equalTo: $typeId}}}}}){
            count
            edges{
                node{
                    objectId
                    brandId {
                        objectId
                    }
                    img
                    name
                    price
                    rating
                    typeId {
                        objectId
                    }
                }
            }
        }
    }
`

export const FETCH_DEVICES_WHEN_BRAND = gql`
    query ( $limit: Int!, $skip: Int! $brandId: ID) {
        devices ( first: $limit , skip: $skip, where: {brandId:{have: {objectId: {
            equalTo: $brandId
        }}}}){
            count
            edges{
                node{
                    objectId
                    brandId {
                        objectId
                    }
                    img
                    name
                    price
                    rating
                    typeId {
                        objectId
                    }
                }
            }
        }
    }
`

export const FETCH_DEVICES_WHEN_TYPE = gql`
    query ( $limit: Int!, $skip: Int! $typeId: ID) {
        devices ( first: $limit , skip: $skip, where: {typeId: {have: {objectId: {equalTo: $typeId}}}}){
            count
            edges{
                node{
                    objectId
                    brandId {
                        objectId
                    }
                    img
                    name
                    price
                    rating
                    typeId {
                        objectId
                    }
                }
            }
        }
    }
`

export const FETCH_DEVICES = gql`
    query ( $limit: Int!, $skip: Int!) {
        devices ( first: $limit , skip: $skip ){
            count
            edges{
                node{
                    objectId
                    brandId {
                        objectId
                    }
                    img
                    name
                    price
                    rating
                    typeId {
                        objectId
                    }
                }
            }
        }
    }
`

export const CREATE_TYPE = gql`
    mutation ( $name: String! ) {
        createType (input: {
            fields: {
                name: $name
            }
        }){
            type{
                objectId
                name
            }
        }
    }
`

export const CREATE_BRAND = gql`
    mutation ( $name: String! ) {
        createBrand (input: {
            fields: {
                name: $name
            }
        }){
            brand{
                objectId
                name
            }
        }
    }
`

export const CREATE_DEVICE = gql`
    mutation ( $name: String! $price: Float! $rating: Float! $typeId: ID! $brandId: ID! $img: String! ) {
        createDevice (input: {
            fields: {
                name: $name
                price: $price
                rating: $rating
                typeId: {
                    link: $typeId
                }
                brandId: {
                    link: $brandId
                }
                img: $img
            }
        }){
            device{
                objectId
                name
                price
                img
            }
        }
    }
`

export const CREATE_FILE = gql`
    mutation ($file: Upload!) {
        createFile( input: {upload: $file}) {
            fileInfo {
                url
            }
        }
    }
`

export const CREATE_INFO = gql`
    mutation ( $title: String! $description: String! $deviceId: ID!) {
        createDevice_info(input: {
            fields: {
                description: $description,
                title: $title,
                deviceId: {link: $deviceId}
            }
        }){
            device_info {
                deviceId {
                    objectId
                }
                title
                description
            }
        }
    }
`

export const GET_DEVICE = gql`
    query ( $id: ID! ){
        device_infos (where: {
            deviceId: {
                have: {
                    objectId: {
                        equalTo: $id
                    }
                }
            }
        }){
            edges{
                node{
                    objectId
                    title
                    description
                }
            }
        }
        device (id: $id) {
            objectId
            img
            name
            price
            rating
            brandId {
                objectId
            }
            typeId {
                objectId
            }
        }
    }
`

// export const DELETE_DEVICE = gql`
//     mutation ($id: ID!) {
//         deleteDevice(input: {
//             id: $id
//         }){
//             device {
//                 name: 'test'
//             }
//         }
//         deleteRating()
//     }
//
// `

// export const DELETE_INFO = gql`
//     mutation ( $id:ID! ) {
//         deleteRating(input:)
//     }
// `

