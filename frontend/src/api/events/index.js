import { gql } from 'apollo-boost';


export const CREATE_EVENT = gql`mutation addCommunityEvent($name:String!,   $eventCreator:ID!,
    $description: String!, $position:String!, $startAt:Date!){
        addCommunityEvent(
                        input : {
                        name:$name, eventCreator:$eventCreator, 
                        description:$description, position:$position, startAt:$startAt}
                    ){
                        errors{field, messages}
                    }
}`