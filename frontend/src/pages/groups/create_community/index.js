import React  from "react"
import CreateCommunityForm  from "../../../components/forms/CommunityCreationForm/index"

import { Heading , Anchor,  Header, Nav, Main, Box } from 'grommet';
import { GET_CURRENT_USER} from "../../../api/users/index"
import {useQuery } from 'react-apollo';
const items = [
    { label: 'go back to dashboard', href: 'dashboard/me' },
    { label: 'Logout ', href: '/logout' },
];
function CreateCommunity ()  {
    const { data,loading, error} = useQuery(GET_CURRENT_USER)
    if(loading) return<div>loading...</div>
    if(error) console.log(error)
   

        return(
            <>
            <Header background="dark-1" pad="small">
                <Nav direction="row">
                    {items.map(item => (
                    <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
            </Header>
            <Main>
            <Box pad="small">
                
            </Box>   
                <Box fill align="center">
                    <Box width="medium">
                        <Header  pad="small">
                            <Heading level={2} size="medium">
                            A new Community
                            </Heading>
                        </Header>         
                        <CreateCommunityForm current_user={data.getCurrentMember.id} /> 
                    </Box>
                </Box>
            </Main >
            </>
        )



   

}
export default CreateCommunity
