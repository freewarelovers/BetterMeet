import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`mutation tokenAuth($email:String!, $password:String!){
            tokenAuth(email:$email, password:$password){
                token,
                refreshToken,
                errors,
                success,
                user{pk, email}
            }
}`

export const CHECK_AUTH_TOKEN = gql`mutation verifyToken($token:String!){
      verifyToken(token:$token){
          errors,
          success,
          payload
      }
}`

export const REFRESH_TOKEN = gql`mutation refreshToken($token:String!) {
    refreshToken(refreshToken : $token){
        token,
        payload,
        success,
        errors,
    }
}`