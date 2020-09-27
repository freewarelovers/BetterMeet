import React from "react"
//import queryString from "query-string"
import {useRouteMatch} from "react-router-dom"
import  EventCreationForm from "../../../components/forms/eventCreationForm/index"
import {GET_CURRENT_COMMUNITY_BY_SLUG} from "../../../api/communitys/index"
import {useQuery} from 'react-apollo';
import { Heading , Anchor,  Header, Nav, Main, Box } from 'grommet';
const items = [
    { label: 'go back to dashboard', href: '/dashboard/me' },
    { label: 'Logout ', href: '/logout' },
];
export default function CommunityPage (){

    const location = useRouteMatch();
    console.log(location.params.slug )
    const {data, loading , error}= useQuery(GET_CURRENT_COMMUNITY_BY_SLUG, {
        variables : { slug: location.params.slug }
    })
    if(data) console.log(data.getCommunitysBySlug.community.name)
    
    if(error) console.log(error)

    if (loading) return <div>Loading</div>

    return(
        <>
            <Header background="dark-1" pad="small">
                <Nav direction="row">
                    {
                        items.map(item => (
                            <Anchor href={item.href} label={item.label} key={item.label} />
                        ))
                    }
                </Nav>
            </Header>
            <Main>
         
                <Box fill align="center">
                        <Header   
                            background={{
                                color: '#CDEAC4',
                            }}
                            pad={{ left: 'medium', bottom: 'small' }}
                            size="large"
                            fill
                        >
                        
                            <Heading 
                            level={1}  
                            justify="end" 
                            align="center"
                            color="white" 
                            size="large">
                                {data  ? data.getCommunitysBySlug.community.name : undefined}
                            </Heading>

                        </Header> 
                    <Box width="medium">                               
                        <EventCreationForm />
                    </Box>
                </Box>
            </Main >
         </>
    )
}