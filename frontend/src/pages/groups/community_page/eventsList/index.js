import React  from "react"
import { Heading , Text,  Box, List } from 'grommet';
import {GET_COMMUNITY_EVENTS_BY_SLUG} from "../../../../api/events/index"
import {useHistory, useRouteMatch} from "react-router-dom";
import {useQuery} from 'react-apollo';

export default function CommunityEventsList(props){

    
    const location = useRouteMatch();
    const history = useHistory()
    console.log(useQuery(GET_COMMUNITY_EVENTS_BY_SLUG,{
        variables : { slug: location.params.slug }
    }))
    const {data, loading , error}= useQuery(GET_COMMUNITY_EVENTS_BY_SLUG,{
        variables : { slug: location.params.slug }
    })

    if (error) console.log(error)
    if (loading) return <div>Loading</div>
    return(
        <>
        {data ? 
            (
                <List data={data.getCommunityEventsBySlug} >
                    {  
                    (element)=>(     
                        <Box  key={element.id}  onClick={event=>
                            (history.push(`/communities/${props.community_slug}/events/${element.id}`))
                        } 
                        fill>
                                <Heading level="4" >{element.name}</Heading>
                                <Text size="small"> on {element.startAt}</Text>
                                <Text size="small"> place  {element.position}</Text>
                              
                               
                        </Box>                        
                    )
                    }
                </List>
            )
            : <div>Loading...</div>}
            </>
    )
}