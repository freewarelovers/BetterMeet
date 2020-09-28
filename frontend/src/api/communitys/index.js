import { gql } from 'apollo-boost';

export const CREATE_COMMUNITY = gql`mutation addCommunity($name:String!){
    addCommunity(input : {name: $name}){
        errors{field,messages},
        community{id,slug,name}
    }
}`


export const CREATE_COMMUNITY_OWNER = gql`mutation addOwnerToCommunity($owner:ID!, $community:ID!){
    addOwnerToCommunity(input : {owner : $owner, community: $community}){
        communityOwner{id},
        errors{field,messages}
    }

}`

export const GET_CURRENT_COMMUNITY_BY_SLUG = gql`query   getCommunitysBySlug($slug:String){
    getCommunitysBySlug(slug : $slug){
        id,
        owner{id,dateJoined,username,firstName,lastName},
        community{name,slug,createdAt}
    }
}`


export const GET_CURRENT_COMMUNITY_OWNER  = gql`query{
    getCurrentCommunityOwner{
     id,
   }
  
 }`
  