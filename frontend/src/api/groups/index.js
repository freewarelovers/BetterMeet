import { gql } from 'apollo-boost';

export const CREATE_GROUP = gql`mutation tokenAuth($email:String!, $password:String!){
            tokenAuth(email:$email, password:$password){
                token,
                errors,
                success,
                user{id}
            }
}`

export const CREATE_GROUP = gql`mutation tokenAuth($email:String!, $password:String!){
    tokenAuth(email:$email, password:$password){
        token,
        errors,
        success,
        user{id}
    }
}`