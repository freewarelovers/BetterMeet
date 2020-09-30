import { gql } from 'apollo-boost';


export const CREATE_EVENT = gql`mutation  addEvent($name:String!,   $eventCreator:ID!,
    $description: String!, $position:String!, $startAt:Date!){
        addEvent(
                        input : {
                        name:$name, eventCreator:$eventCreator, 
                        description:$description, position:$position, startAt:$startAt}
                    ){
                        errors{field, messages},
                        event{id,name,slug,position}
                    }
}`

export const ALL_EVENTS = gql`query{
    allEvents{
    id,
      name,
      eventCreator{owner{email}, community{name}}
      slug,
      description,
      position,
      startAt
      
    }
  }`


export const GET_COMMUNITY_EVENTS_BY_SLUG = gql`query getCommunityEventsBySlug($slug:String!){
  getCommunityEventsBySlug(slug:$slug){
    id,
    name,
    slug,
    description,
    position,
    startAt,
  }
}`

export const GET_CURRENT_EVENT = gql`
  query getCurrentEvent($id:ID!){
    getCurrentEvent(id:$id){
      id,
      name,
      slug,
      eventCreator{owner{firstName,lastName}, community{name,slug}},
      description,
      position,
      startAt
    }
  }
`