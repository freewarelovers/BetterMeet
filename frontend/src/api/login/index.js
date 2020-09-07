import { gql } from 'apollo-boost';


export const LOGIN_USER = gql`mutation tokenAuth($email:String!, $password:String!){
            tokenAuth(email:$email, password:$password){
                token
            }
}`