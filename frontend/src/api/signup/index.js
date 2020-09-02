import { gql } from 'apollo-boost';

/// create user mutation
export const CREATE_USER = gql `
                mutation  {                
                    addMember(input: {firstName: "abderrahmane", lastName:"toumi", email:"aazxass@mail.com", password1: "Abdou030898mA", password2:"Abdou030898mA"}){
                        customUser{id}
                    member{id,firstName,lastName}
                    errors{field,messages}
                }
                }`

//export const  LIST_USERS = gql``