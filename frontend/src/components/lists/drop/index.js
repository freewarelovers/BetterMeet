import React from "react"
import {Box, List, Heading, Text} from "grommet"
import { useHistory } from "react-router-dom";
export function Drop(props){
    let history = useHistory()
    console.log("drop props ",props)
    return(
        <>
        <Heading level="4" >{props.header}</Heading>
        
        <List data={props.data} >
            {  
                (element)=>(     
                    <Box  key={element.community.id}  onClick={event=>
                        (history.push(`/communities/${element.community.slug}`))
                        } 
                    fill>                            
                        <Text size="small">{element.community.name}</Text>
                    </Box>                        
                 )
            }
        </List>
        </>
    )
}