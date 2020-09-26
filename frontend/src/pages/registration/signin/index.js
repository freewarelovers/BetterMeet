import React from "react"
import SigninForm from "../../../components/forms/signinForm/index"
import {Link} from "react-router-dom"

import {
    Box,
    Heading,
    Header,
    Anchor,
  } from 'grommet';
function Signin (){
     
        return(            
        

             <Box fill align="center"  pad="small" justify="center">
                <Box width="medium">
                <Header  pad="small">
                    <Heading level={2} size="medium">
                            Signin
                    </Heading>
                </Header>  

                <SigninForm />
                <Anchor color="dark-1"   to="signup/">Create new account</Anchor>
                </Box>
            </Box>
        
        )
      


    }

export default Signin
