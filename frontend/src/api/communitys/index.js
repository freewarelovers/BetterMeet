import { gql } from 'apollo-boost';

export const CREATE_COMMUNITY = gql`mutation addCommunity($name:String!){
    addCommunity(input : {name:$name}){
                errors,
                success,
            }
}`

export const CREATE_COMMUNITY_OWNER = gql`mutation tokenAuth($email:String!, $password:String!){
    tokenAuth(input : {email:$email, password:$password}){
        token,
        errors,
        success,
        user{id}
    }
}`