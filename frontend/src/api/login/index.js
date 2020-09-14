import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`mutation tokenAuth($email:String!, $password:String!){
            tokenAuth(email:$email, password:$password){
                token,
                errors,
                success,
                user{id}
            }
}`

export const CHECK_AUTH_TOKEN = gql`mutation verifyToken($token:String!){
      verifyToken(token:$token){
          errors,
          success,
          payload
      }
}`