import React  from "react"

import {useQuery} from  "react-apollo"
import {Drop} from "../../../components/lists/drop/index"
import { ALL_EVENTS } from "../../../api/events/index"
import { GET_CURRENT_USER_COMMUNITYS } from "../../../api/communitys/index"

import { Heading, Text, List , Anchor,  Header, Nav, Main, Box, DropButton } from 'grommet';

import { useHistory } from "react-router-dom";
const items = [
    { label: 'Create new Community', href: '/create-community' },
    { label: 'Logout ', href: '/logout' },
  ];


function  Dashboard (){
   
    const { loading, error, data } = useQuery(ALL_EVENTS);
   const {data:currentuser_data, loading:currentuser_loading} =useQuery(GET_CURRENT_USER_COMMUNITYS)
   const [open, setOpen] = React.useState();
   let history = useHistory()

   const onOpen = () => {
     setOpen(true);
   };
   const onClose = () => {
     setOpen(false);
   };

  

   
    
    if(data) console.log(data)

    if (loading || currentuser_loading  ) return <div>Loading</div>
   
    if(error) console.log(error)
   
    
    return(
        <>
            
            <Header background="dark-1" pad="small">
                <Nav direction="row">
                    {items.map(item => (
                        <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                    {currentuser_data ?
                    <DropButton
                        label="Options"
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        dropContent={<Drop data={currentuser_data.getCurrentUserCommunitys} header={"Communitys"} />}
                        dropProps={{ align: { top: 'bottom' } }}
                    />
                    : undefined}
                </Nav>
            </Header>
            <Main >

            <Box pad="small">
                <Heading level="3" >Here is what happening in Community Lovers</Heading>
            </Box>

            <Box gap="medium" pad="large">
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
            </Box>
            </Main>
        </>
    )

}

export default Dashboard