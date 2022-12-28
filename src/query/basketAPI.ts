import {gql} from "@apollo/client";

export const ADD_DEVICE_BASKET = gql`
    mutation ( $userId: ID! $deviceId: ID!) {
        createBasket_Device(input: {fields: {
            userId: {link: $userId}
            deviceId: {link: $deviceId}
        }
        }){
            basket_Device {
                objectId
                deviceId {
                    objectId
                    img {
                        url
                    }
                    name
                    price
                }
            }
        }
    }
`

export const CHECK_DEVICE_BASKET = gql`
    query checkDeviceBasket( $userId: ID! $deviceId: ID!) {
        basket_Devices ( where: {deviceId: {have: {objectId: {equalTo: $deviceId}}},
            userId: {have: {objectId: {equalTo: $userId}}}
        }){
            edges {
                node {
                    objectId
                }
            }
        }
    }
`

export const GET_DEVICE_BASKET = gql`
    query getDeviceBasket( $userId: ID! ) {
        basket_Devices (where: {userId: {have: {objectId: {equalTo: $userId}}}}){
            edges {
                node {
                    objectId
                    deviceId {
                        objectId
                        img{
                            url
                        }
                        name
                        price
                    }
                }
            }
        }
    }
`

export const DELETE_DEVICE_BASKET = gql`
    mutation deleteDeviceBasket( $id: ID! ) {
        deleteBasket_Device(input: {id: $id}){
            basket_Device {
                objectId
                deviceId {
                    name
                }
            }
        }
    }
`