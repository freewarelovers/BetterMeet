import { gql } from 'apollo-boost';

/// create user mutation
export const CREATE_USER = gql `mutation register($first_name:String!, $last_name:String!, $email:String!, 
                            $password1:String!, $password2:String!){                
                            register(firstName: $first_name, lastName:$last_name, email:$email,
                            password1: $password1, password2:$password2){
                                success,
                                errors,
                                token,
                                refreshToken
                        }}`

                
//export const  LIST_USERS = gql``