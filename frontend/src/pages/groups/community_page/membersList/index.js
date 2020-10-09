import React from "react"
import { Heading , Text, Anchor, Box, Tabs, Tab } from 'grommet';

function CommunityMembersList(){

    return(
        {data ? 
            (
                <List data={data.allEvents} >
                    {  
                    (element)=>(     
                        <Box  key={element.id}  onClick={event=>
                            (history.push(`/event/${element.id}`))
                        } 
                        fill>
                                <Heading level="4" >{element.name}</Heading>
                                <Text size="small"> by {element.eventCreator.community.name}</Text>
                                <Text size="small"> on {element.startAt}</Text>
                                <Text size="small"> place  {element.position}</Text>
                              
                               
                        </Box>                        
                    )
                    }
                </List>
            )
            : <div>Loading...</div>}
    )
}