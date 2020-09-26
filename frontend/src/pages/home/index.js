import React  from "react"

import { Heading, Anchor,  Header, Nav, Main, Box } from 'grommet';


const items = [
    { label: 'Login', href: '/signin' },
    { label: 'Signup', href: '/signup' },
  ];

function Home (){

        return(        
            <>
            
                <Header background="dark-1" pad="small">
                <Nav direction="row">
                    {items.map(item => (
                    <Anchor href={item.href} label={item.label} key={item.label} />
                    ))}
                </Nav>
                </Header>
                <Main    background="dark-1"  pad="large">
                  <Box 
                      gap="small"
              direction="column"
              align="center"
              justify="end"
              pad={{ top: 'medium', bottom: 'small' }}>
                    <Heading gap="medium" align="center"  level="1" size="large">
                    We Are Community Lovers
                        
                    </Heading>

                    <Heading gap="medium" align="center"  level="2" size="large">
                    An open community platform  
                    </Heading>
                  </Box>     
                </Main>           
         
            </>
            ) 

}
export default Home