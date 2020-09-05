import { gql } from 'apollo-boost';

/// create user mutation
export const CREATE_USER = gql `mutation addMember($first_name:String!, $last_name:String!, $email:String!, 
                            $password1:String!, $password2:String!){                
                        addMember(input: {firstName: $first_name, lastName:$last_name, email:$email,
                            password1: $password1, password2:$password2}){
                            customUser{id,first_name, last_name, email}
                            errors{field,messages}
                        }}`

                
//export const  LIST_USERS = gql``