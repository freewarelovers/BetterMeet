import { gql } from 'apollo-boost';

export const CREATE_COMMUNITY = gql`mutation addCommunity($name:String!){
    addCommunity(input : {name: $name}){
        errors{field,messages},
        community{id,slug,name}
    }
}`

//export const GET_CURRENT_COMMUNITY = gql``
export const CREATE_COMMUNITY_OWNER = gql`mutation addOwnerToCommunity($owner:ID!, $community:ID!){
    addOwnerToCommunity(input : {owner : $owner, community: $community}){
        communityOwner{id},
        errors{field,messages}
    }

}`