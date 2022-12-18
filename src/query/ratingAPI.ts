import {gql} from "@apollo/client";



export const ADD_RATE = gql`
    mutation addRating( $deviceId: ID! $userId: ID! $rate: Float! ) {
        createRating(input: {
            fields: {
                deviceId: {
                    link: $deviceId
                }
                userId: {
                    link: $userId
                },
                rate: $rate,
            }
        }){
            rating {
                objectId
                rate
            }
        }
    }
`

export const UPDATE_DEVICE = gql`
    mutation updateDevice( $deviceId: ID! $rate: Float) {
        updateDevice(input: {id: $deviceId, fields: {rating: $rate} }){
            device {
                objectId
                rating
            }
        }
    }
`

export const CHECK_RATE_USER = gql`
    query checkRateUser( $userId: ID! $deviceId: ID! ) {
        ratings ( where: {userId: {have: {objectId: {equalTo: $userId}}},
            deviceId: {have: {objectId: {equalTo: $deviceId}}}}){
            count
            edges {
                node {
                    objectId
                    rate
                }
            }
        }
    }
`

export const CHANGE_RATE = gql`
    mutation changeRate( $id: ID! $rate: Float! ) {
        updateRating(input: {id: $id, fields: {rate: $rate}}){
            rating {
                objectId
                rate
            }
        }
    }
`

export const DELETE_RATE = gql`
    mutation deleteRate( $id: ID! ) {
        deleteRating(input: {id: $id}) {
            rating {
                objectId
                userId {
                    objectId
                }
                deviceId {
                    objectId
                }
                rate
            }
        }
    }
`

export const GET_RATING_DEVICE = gql`
    query getRatingDevice( $deviceId: ID! ) {
        ratings (where: {deviceId: {have: {objectId: {equalTo: $deviceId}}}}){
            count
            edges {
                node {
                    rate
                    objectId
                }
            }
        }
    }
`


